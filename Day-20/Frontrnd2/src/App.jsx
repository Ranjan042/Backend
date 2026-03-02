import React from 'react'
import AppRoute from './Routes/AppRoute'
import AuthContexts  from './Features/Auth/context/AuthContexts'

const App = () => {
  return (
    <AuthContexts>
      <AppRoute />
    </AuthContexts>
  )
}

export default App
