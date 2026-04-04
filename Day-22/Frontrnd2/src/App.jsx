import React from 'react'
import AppRoute from './Routes/AppRoute'
import AuthContexts  from './Features/Auth/context/AuthContexts'
import PostContexts, { PostContext } from './Features/Post/Context/PostContexts'

const App = () => {
  return (
    <AuthContexts>
      <PostContexts>
         <AppRoute />
      </PostContexts>
    </AuthContexts>
  )
}

export default App
