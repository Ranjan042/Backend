import { Navigate } from "react-router"
import { useAuth } from "../../Features/Auth/Hook/UseAuth.jsx";
import { useEffect } from "react";

const ProtectedRoute = ({children,allowedRoles}) => {

    const {user,loading}=useAuth();
    
    if(loading) return <h1>Loading....</h1>
    
    if(!user){
      return <Navigate to={"/login"} />
    }

    if(allowedRoles && !allowedRoles.includes(user.Role)){
        return <Navigate to={"/"} />
      }
    


  return children
  
}

export default ProtectedRoute
