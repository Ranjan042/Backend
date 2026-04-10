import { useDispatch } from "react-redux";
import { SetUser, SetLoading, SetError } from "../State/Authslice";
import {Login,Register} from "../Service/AuthApi";

export const useAuth=()=>{
    const dispatch=useDispatch()

    const HandleLogin=async({Email,Password})=>{
        dispatch(SetLoading(true))
        try {
            const response=await Login({Email,Password})
            dispatch(SetUser(response.user))
            dispatch(SetError(null))
        } catch (error) {
            dispatch(SetError(error.response.data.message))
        }finally{
            dispatch(SetLoading(false))
        }
    }

    const HandleRegister=async({Email,Contact,Password,FullName,isSeller})=>{
        dispatch(SetLoading(true))
        try {
            const response=await Register({Email,Contact,Password,FullName,isSeller})
            dispatch(SetUser(response.user))
            dispatch(SetError(null))
        } catch (error) {
            dispatch(SetError(error.response.data.message))
        }finally{
            dispatch(SetLoading(false))
        }
    }

    return {HandleLogin,HandleRegister}
}