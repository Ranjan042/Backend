import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from "axios"
const Register = () => {

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpssword] = useState("")

    async function handleSubmit(e) {
         e.preventDefault();

        axios.post("http://localhost:3000/api/auth/register",{
            username,
            email,
            password,
        },{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
  <main>
    <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input onChange={(e)=>{setusername(e.target.value)}} type="text" name='username' placeholder='Enter Username' />
            <input onChange={(e)=>{setemail(e.target.value)}} type="email" name='email' placeholder='Enter email' />
            <input onChange={(e)=>{setpssword(e.target.value)}} type="password" name="password" placeholder=' Enter password' />
            <button type='submit' onClick={handleSubmit}>Register</button>
        </form>
        <p>Already have an account? <Link to="/login" className='toogleAuthForm'>Login</Link></p>
    </div>
  </main>
  )
}

export default Register
