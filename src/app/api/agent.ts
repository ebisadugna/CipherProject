import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../routes/Routes';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';

axios.defaults.baseURL = 'http://localhost:3001/';

axios.interceptors.request.use(config=>{
    var  token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization  = `Bearer ${token}`
    return config
})

axios.interceptors.response.use( async response =>{
    return response;
},(error:AxiosError)=>{
    const {data, status,config} = error.response as AxiosResponse;
    switch (status){
        case 400:
            if(config.method === 'get' && data.hasOwnProperty('id')){
                router.navigate('/not-found')
            }
            if (data.errors){
                const modelStateErrors =[];
                for (const key in data.errors){
                    if (data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat()
            }
            else{
                toast.error(data)
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found')
            break
        case 500:
            toast.error('server error')
            store.commonStore.setServerError(data)
            router.navigate("/server-error")
            break            
    }
    return Promise.reject(error);
})

const responseBody = <T> (response:AxiosResponse<T>) => response.data

const requests ={
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:<T>(url:string,body:{})=>axios.post<T>(url,body).then(responseBody),
    put:<T>(url:string,body:{})=>axios.put<T>(url,body).then(responseBody),
    del:<T>(url:string)=> axios.delete<T>(url).then(responseBody)
}




const Account ={
    current: ()=>requests.get<User>("/auth/profile"),
    login:(user:UserFormValues)=>requests.post<User>("/auth/login",user),
    register:(user:UserFormValues)=>requests.post<User>("/auth/signup",user)
}

const agent = {
    Account
}

export default agent;