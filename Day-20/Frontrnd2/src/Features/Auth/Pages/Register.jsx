import React from 'react'
import { Link } from 'react-router'
const Register = () => {
  return (
    <main>
        <h1>Register</h1>
        <form>
            <input type="text" name="email" id="" placeholder='Enter Your Email'/>
            <input type="text" name="username" id="" placeholder='Enter Username'/>
            <input type="password" name="username" id="" placeholder='Enter password'/>
            <button>Register</button>
            <p>Already have an account<Link to={"/login"}>Login</Link></p>
        </form>
    </main>
  )
}

export default Register
