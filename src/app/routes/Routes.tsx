import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import TestErrors from "../../features/Errors/TestErrors";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";
import EncryiptionForm from "../../features/Encryption/EncryiptionForm";
import LoginForm from "../../features/users/LoginForm";
const routes:RouteObject[]= [
    {
        path:"/",
        element:<App/>,
        children:[
            {path:"login",element: <LoginForm/>},
            {path:"encryptionboard",element:<EncryiptionForm/>},
            {path:"errors",element:<TestErrors/>},
            {path:"not-found",element:<NotFound/>},
            {path:"server-error",element:<ServerError/>},
            {path:"*",element:<Navigate replace to='/not-found'/>}

        ]
    }

]

export const router = createBrowserRouter(routes)