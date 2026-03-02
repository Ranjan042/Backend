import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { UseAuth } from '../Hook/UseAuth'
import "../Style/LoginStyle.css"
const Login = () => {
  const {user,loading,handleLogin}=UseAuth()
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  const Navigate=useNavigate()

  if(loading){
    return (<h1>loading......</h1>)
  }

  function handleSubmit(e){
    e.preventDefault();
    
    handleLogin(username,password)
    .then(res=>{
      console.log(res)
      Navigate("/")
    });
  
  }
  return (
    <main>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input onChange={(e)=>{setusername(e.target.value)}} type="text" name="login" placeholder='Enter username' />
            <input onChange={(e)=>{setpassword(e.target.value)}} type="password" name="login" placeholder='Enter password' />
            <button>Login</button>
            <p>Don't have an Account <Link to="/register">Register</Link></p>
        </form>
    </main>
  )
}

export default Login
