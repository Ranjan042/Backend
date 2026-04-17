import { useDispatch, useSelector } from "react-redux";
import { SetUser, SetLoading, SetError } from "../State/Authslice";
import { LoginUser, RegisterUser, GetMe } from "../Service/AuthApi";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    console.log("User In hook",user)

    const HandleLogin = async ({ Email, Password }) => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await LoginUser({ Email, Password });
            dispatch(SetUser(response.user));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Login failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleRegister = async ({ Email, PhoneNumber, Password, FullName, isSeller }) => {
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            const response = await RegisterUser({ Email, PhoneNumber, Password, FullName, isSeller });
            dispatch(SetUser(response.user));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Registration failed"));
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const HandleGetMe=async()=>{
        dispatch(SetLoading(true));
        dispatch(SetError(null));
        try {
            console.log("Handle Get ME is running")
            const response = await GetMe();
            console.log("Response",response)
            dispatch(SetUser(response.user));
        } catch (error) {
            dispatch(SetError(error?.response?.data?.message || "Registration failed"))
        } finally {
            dispatch(SetLoading(false));
        }
    };

    return { HandleLogin, HandleRegister,HandleGetMe, user, loading, error };
};