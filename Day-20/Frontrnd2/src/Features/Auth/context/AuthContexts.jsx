import React, { useState } from 'react'
import { createContext } from 'react'

 export const AuthContext=createContext(null)

const AuthContexts = ({children}) => {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(false)
  return (
   <AuthContext.Provider value={{user,setuser,loading,setloading}}>
        {children}
   </AuthContext.Provider>
  )
}

export default AuthContexts
