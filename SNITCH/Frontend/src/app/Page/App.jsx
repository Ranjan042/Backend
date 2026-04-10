import React from 'react'
import "../Style/App.css"
import Approutes from '../Routes/Approute.jsx'
import { RouterProvider } from 'react-router'

const App = () => {
  return (
    <RouterProvider router={Approutes}/>
  )
}

export default App
