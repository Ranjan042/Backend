import React from 'react'
import { RouterProvider } from 'react-router'
import { Approuter } from './Routes/AppRoutes'
import { useAuth } from '../features/Auth/hook/useAuth'
import { useEffect } from 'react'



const App = () => {
  const auth=useAuth();

  useEffect(() => {
    auth.HandleGetme();
  }, []);

  return (
   <RouterProvider router={Approuter}/>
  )
}

export default App
