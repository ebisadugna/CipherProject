import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../routes/Routes";


export default class UserStore{
    user : User | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (cred:UserFormValues)=>{
        try {
            const response:any=  await agent.Account.login(cred);
            const user = response.data
            store.commonStore.setToken(user.token);
            runInAction(()=>this.user = user);
            router.navigate("/encryptionboard")
            store.modalStore.closeModal();
            
        } catch (error) {
            throw error;
        }
    }

    register = async (cred:UserFormValues)=>{
        try {
            await agent.Account.register(cred);
            router.navigate("/login")
           store.modalStore.closeModal()
        } catch (error) {
            throw error;
        }
    }

    logout = async ()=>{
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate("/")
    }

    getUser = async ()=>{
        try {
            const response:any = await agent.Account.current();
            const user = response.data;
            user.token = store.commonStore.token!
            console.log(user)
            runInAction(()=>this.user = user);
        } catch (error) {
            console.log(error)
        }

    }
}