import { createBrowserRouter } from "react-router";
import Login from "../../features/Auth/Pages/Login";
import Register from "../../features/Auth/Pages/Register";
import Protected from "../../features/Auth/components/Protected";
import Dashboard from "../../features/chat/Pages/Dashboard";

export const Approuter=createBrowserRouter([
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/register",
        element:<Register />
    },{
        path:"/",
        element:<Protected>
            <Dashboard />
        </Protected>
    }
])