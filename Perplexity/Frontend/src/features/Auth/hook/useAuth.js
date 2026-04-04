import { useDispatch } from "react-redux";
import { Register, Login, Getme } from "../service/AuthApi";
import { setuser, setloading, seterror} from "../authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const HandleRegister = async ({email, username, password}) => {
    try {
      dispatch(setloading(true));
      dispatch(seterror(null));

      const response = await Register({ email, username, password });
      return response;
    } catch (error) {
      dispatch(seterror(error?.response?.data?.message || "Registration Failed"));
    } finally {
      dispatch(setloading(false));
    }
  };

  const HandleLogin = async ({email, password}) => {

    console.log("email",email)
    console.log("password",password)
    try {
      dispatch(setloading(true));
      dispatch(seterror(null));

      const response = await Login({ email, password });
      dispatch(setuser(response.user));
      return response;
    } catch (error) {
      dispatch(seterror(error?.response?.data?.message || "Login Failed"));
    } finally {
      dispatch(setloading(false));
    }
  };

  const HandleGetme = async () => {
    try {
      dispatch(setloading(true));
      dispatch(seterror(null));

      const response = await Getme();
      dispatch(setuser(response.user));
      return response;
    } catch (error) {
      dispatch(seterror(error?.response?.data?.message || "Getme Failed"));
    } finally {
      dispatch(setloading(false));
    }
  };

  return { HandleRegister, HandleLogin, HandleGetme };
};