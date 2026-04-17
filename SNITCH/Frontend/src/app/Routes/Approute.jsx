import { createBrowserRouter } from "react-router";
import Register from "../../Features/Auth/Page/Register";
import Login from "../../Features/Auth/Page/Login";
import ProtectedRoute from "./ProtectedRoute";
import CreateProduct from "../../Features/products/Pages/CreateProduct";
import ShowProducts from "../../Features/products/Pages/ShowProducts";
import Home from "../Page/Home";
const Approutes=createBrowserRouter([
    {
        path:"/",
        element:<Home />
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/seller",
        children:[
            {
                path:"/seller/create-product",
                element:<ProtectedRoute allowedRoles={["seller"]}><CreateProduct /></ProtectedRoute>
            },
            {
                path:"/seller/products",
                element:<ProtectedRoute allowedRoles={["seller"]}><ShowProducts /></ProtectedRoute>
            }
        ]
    }
]); 

export default Approutes