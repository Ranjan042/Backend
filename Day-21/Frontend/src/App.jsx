import React from 'react'
import AppRoute from './AppRoute'
import "./style.scss"
import { AuthProvider } from './features/Auth/AuthContext.jsx'

const App = () => {
  return (
    <AuthProvider>
        <AppRoute />
    </AuthProvider>
  )
}

export default App
