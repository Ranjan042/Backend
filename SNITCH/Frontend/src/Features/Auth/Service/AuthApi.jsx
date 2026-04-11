import axios from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export async function RegisterUser({Email,PhoneNumber,Password,FullName,isSeller}) {
    try {
        const response = await authApi.post("/register", {
            Email,
            PhoneNumber,
            Password,
            FullName,
            isSeller
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function LoginUser({Email,Password}) {
    try {
        const response = await authApi.post("/login", {
            Email,
            Password
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}