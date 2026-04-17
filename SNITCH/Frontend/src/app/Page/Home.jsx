import React from 'react'
import { useAuth } from '../../Features/Auth/Hook/UseAuth.jsx'
import { Navigate } from 'react-router';
const Home = () => {
    const {user,loading}=useAuth();
    if(loading) return <h1>Loading....</h1>
    if(!user) return <Navigate to={"/login"} />
    if(user.Role==="seller") return <Navigate to={"/seller"} />
  return (
    <div>
      Public Home
    </div>
  )
}

export default Home
