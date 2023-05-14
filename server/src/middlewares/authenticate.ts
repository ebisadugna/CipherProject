import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import userService from '../services/user';
import { jwtSecret } from '../controllers/authController';

const isAuthenticated = (req: Request, res:Response, next: NextFunction) => {
  try{

    let token = req.headers['authorization'] || req.body.token || req.headers.cookie?.split('=')[1] || req.cookies?.jwt;
    if (token) {
      const bearer = token.split(' ');
      if(bearer.length == 2){
        token = bearer[1];
      }else{
        token = bearer[0];
      }
      jwt.verify(token, jwtSecret, async (err, decodedToken) => {
        if (err) {
          return res.status(403).json({ messsage: "User not authenticated. The token sent is bad or expired."}).end();
        } else {
      
          let user:any = await userService.getById(decodedToken.id.id)

          if(!user){
            return res.status(403).json({ message: "User not authenticated or token sent is bad or expired."}).end();
          }
          req.auth_user = user;
          next();
          return;
        }
      });
    } else {
        return res.status(403).json({ message: "User not authenticated!"}).end();
    }
  }
  catch(err){
    return res.status(500).json({message:"Internal Server error"})
  }
};

export default isAuthenticated;