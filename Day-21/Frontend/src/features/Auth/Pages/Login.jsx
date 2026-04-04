import React, { useState } from 'react'
import { Link } from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Login = () => {
  const {user,loading,handleLogin}=useAuth()
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate()
  if(loading){
    return (
      <h1>Loading....</h1>
    )
  }

  function handlesubmit(e){
    e.preventDefault()
    handleLogin(username,password)
    .then(res=>{
      console.log(res);
      navigate("/")
    })
  }
  return (

    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <input onChange={(e)=>{setusername(e.target.value)}} type="text" name="username" placeholder='Enter Username' />
                <input onChange={(e)=>{setpassword(e.target.value)}} type="text" name="password" placeholder="Enter PassWord" />
                <button type='submit'>Login</button>
            </form>
             <p>Don't have an account? <Link to="/register" className='toogleAuthForm'>register</Link></p>
        </div>
    </main>
  )
}

export default Login
