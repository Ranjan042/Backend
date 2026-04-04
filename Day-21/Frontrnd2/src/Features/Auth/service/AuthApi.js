import axios from "axios";
const api=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})

export async function Login(username,password) {
    try {
        const response= await api.post("/login",{
            username,
            password
        })
        
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export async function Register(email,username,password) {
    try {
        const response=await api.post("/register",{
            email,
            username,
            password
        })
        
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export async function GetMe(username,password) {
    try {
        const response= await api.post("/GetMe",{
            username,
            password
        })
        
        return response.data;

    } catch (error) {
        console.log(error)
    }
}
