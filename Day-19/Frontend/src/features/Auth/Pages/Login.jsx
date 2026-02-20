import React from 'react'
import { Link } from 'react-router'
import "../style/form.scss"
const Login = () => {
  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form>
                <input type="text" name="username" placeholder='Enter Username' />
                <input type="text" name="password" placeholder="Enter PassWord" />
                <button type='submit'>Login</button>
            </form>
             <p>Don't have an account? <Link to="/register" className='toogleAuthForm'>register</Link></p>
        </div>
    </main>
  )
}

export default Login
