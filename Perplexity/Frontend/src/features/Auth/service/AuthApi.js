import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:3000/api/auth/",
    withCredentials:true
})



export async function Login({email,password}){
    const response=await API.post("login",{
        email,
        password
    })
    return response.data
}
export async function Register({email,username,password}){
    const response= await API.post("register",{
        email,
        username,
        password
    })
    return response.data;
}



export async function Getme(){
    const response=await API.get("/me")
    return response.data
}