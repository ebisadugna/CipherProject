export interface User{
    id:number,
    username:string,
    email:string,
    token:string
}

export interface UserFormValues{
    username?:string,
    email:string,
    password:string,
}