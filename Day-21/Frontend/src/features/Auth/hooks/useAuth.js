import { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";
import {login,register,getMe} from "../services/AuthApi.js"

export function useAuth(){
    const context=useContext(AuthContext)
    const {user,setuser,loading,setloading}=context

    const handleLogin=async(username,password)=>{
        setloading(true)

        const response=await login(username,password)

        setuser(response.user)
        setloading(false)
        
    }
    const handlerRegister=async(username,email,password)=>{
        setloading(true)

        const response=await register(username,email,password)

        setuser(response.user)

        setloading(false)
        
    }

    // const handlegetMe=async (username,password) => {

    //     setloading(true)

    //     const response=await getMe(username,password)

    //     setuser(response.user)

    //     setloading(false)
        
    // }

    return {user,loading,handleLogin,handlerRegister}
}