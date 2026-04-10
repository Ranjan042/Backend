import { createBrowserRouter } from "react-router";
import Register from "../../Features/Auth/Page/Register";
import Login from "../../Features/Auth/Page/Login";

const Approutes=createBrowserRouter([
    {
        path:"/",
        element:<h1>Home</h1>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
]); 

export default Approutes