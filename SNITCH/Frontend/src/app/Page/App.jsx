import React, { useEffect } from 'react'
import "../Style/App.css"
import Approutes from '../Routes/Approute.jsx'
import { RouterProvider } from 'react-router'
import { useAuth } from '../../Features/Auth/Hook/UseAuth.jsx'

const App = () => {
  const {HandleGetMe}=useAuth();

  useEffect(()=>{
    HandleGetMe();
  },[])
  
  return (
    <RouterProvider router={Approutes}/>
  )
}

export default App
