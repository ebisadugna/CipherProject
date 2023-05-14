import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from '../services/user';
import { getdatabase } from '../services/user';

export const jwtSecret = "secret code"


// create json web token 30 -means 30 days
const maxAge = 30 * 24 * 60 * 60;
export const createToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: maxAge
  });
};

const userSignup =async (req:Request,res: Response) => {
  try{
    await userService.createUser(req.body)
    res.status(200).json({message:"User registered successfully"})
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
  
}

const userLogin = async (req: Request, res: Response) => {

    try {
      const { email, password } = req.body;

      const user:any = await userService.login(email, password);
      
      const token = createToken(user);

      res.header('token', token);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      user.token = token;
      return res.status(200).json({
        message: 'User logged in successfully',
        data: user
      });
    }
    catch (err) {
      return res.status(400).json({ error: "Wrong User credentials." }).end();
    }
}



const currentUser = async (req: Request, res:Response) => {
  try{
    
      const db = getdatabase()
      let user:any = await userService.getById(req.auth_user.id)
      db.close()
      if(!user){
        return res.status(404).json({ message: "User not found."}).end();
      }
      return res.status(200).json({
          data: user
        });
  }
  catch(err){
    return res.status(500).json({message:"Server Error"})
  }
};

const authController = { userLogin,currentUser,userSignup}
export default authController