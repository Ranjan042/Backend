import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router"
import Login from '../Features/Auth/Pages/Login'
import Register from '../Features/Auth/Pages/Register'
const AppRoute = () => {
  return (
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<h1>Hii i am App</h1>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
        </BrowserRouter>
  )
}

export default AppRoute
