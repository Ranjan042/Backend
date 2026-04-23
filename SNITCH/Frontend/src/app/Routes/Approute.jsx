import { createBrowserRouter } from "react-router";
import Register from "../../Features/Auth/Page/Register";
import Login from "../../Features/Auth/Page/Login";
import ProtectedRoute from "./ProtectedRoute";
import CreateProduct from "../../Features/products/Pages/CreateProduct";
import ShowProducts from "../../Features/products/Pages/ShowProducts";
import Home from "../../Features/products/Pages/Home";
import DetailedProductPage from "../../Features/products/Pages/DetailedProductPage";
import CartPage from "../../Features/products/Pages/CartPage";
import SellerDetailedProductPage from "../../Features/products/Pages/SellerDetailedPage";
const Approutes=createBrowserRouter([
    {
        path:"/",
        element:<Home />
    },
    {
        path:"/product/:id",
        element:<DetailedProductPage />
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
            },
            {
                path:"/seller/product/:id",
                element:<ProtectedRoute allowedRoles={["seller"]}><SellerDetailedProductPage /></ProtectedRoute>
            }
        ]
    },
    {
        path:"/cart",
        element:<ProtectedRoute allowedRoles={["buyer"]}><CartPage /></ProtectedRoute>
    },
    {
        path:"/checkout",
        element:<ProtectedRoute allowedRoles={["buyer"]}><h1>Checkout</h1></ProtectedRoute>
    }
]); 

export default Approutes