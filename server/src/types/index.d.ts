export {
}

declare global {
  namespace Express {
    interface Request {
      auth_user:IUser
    }
  }

  interface Error{
    statusCode:number
  }
  
  interface IUser {
    id?:string,
    username: String,
    email : String,
    password : String,
  }
}



