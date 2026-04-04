import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {UseAuth} from "../Hook/UseAuth"
const Register = () => {
  const {loading,handleRegister}=UseAuth();
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const Navigate=useNavigate()

  if(loading){
    return (<h1>Loading......</h1>)
  }
  const handlSubmit=async (e)=>{
    e.preventDefault()
    await handleRegister(email,username,password)
    .then(res=>{
      console.log(res);
    })
    Navigate("/")
  }


  return (
    <main className='RegisterPage'>
        <h1>Register</h1>
        <form onSubmit={handlSubmit}> 
            <input onChange={(e)=>{setemail(e.target.value)}} type="text" name="email" id="" placeholder='Enter Your Email'/>
            <input onChange={(e)=>{setusername(e.target.value)}} type="text" name="username" id="" placeholder='Enter Username'/>
            <input onChange={(e)=>{setpassword(e.target.value)}} type="password" name="username" id="" placeholder='Enter password'/>
            <button>Register</button>
            <p>Already have an account<Link to={"/login"}>Login</Link></p>
        </form>
    </main>
  )
}

export default Register
