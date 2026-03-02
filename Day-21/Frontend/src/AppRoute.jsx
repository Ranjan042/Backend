import {BrowserRouter,Routes,Route} from "react-router"
import Login from "./features/Auth/Pages/Login"
import Register from "./features/Auth/Pages/Register"
import Feed from "./features/Post/pages/Feed";

function AppRoute(){
        return(
            <BrowserRouter>
            <Routes>

                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

            </Routes>
            </BrowserRouter>
        )
}

export default AppRoute;