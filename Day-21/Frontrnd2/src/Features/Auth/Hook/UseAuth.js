import { useContext } from "react";
import { AuthContext } from "../context/AuthContexts";
import { Login,Register,GetMe } from "../service/AuthApi";

export function UseAuth() {
   const context = useContext(AuthContext) 
   const {user,setuser,loading,setloading}=context
   
   const handleLogin=async (username,password) => {
        setloading(true)
        const response=await Login(username,password)
        console.log(response)
        setuser(response.user)
        setloading(false)
   }

   const handleRegister=async (email,username,password) => {
        setloading(true)
        const response=await Register(email,username,password)
        console.log(response)
        setuser(response.user)
        setloading(false)
   }
    
   const handleGetme=async (username,password) => {
        setloading(true)
        const response=await GetMe(username,password)
        setuser(response.user)
        setloading(false)
   }

   return {user,loading,handleLogin,handleRegister,handleGetme}
}