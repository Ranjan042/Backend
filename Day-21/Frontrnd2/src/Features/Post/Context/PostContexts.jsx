import { createContext, useState } from "react";
export const PostContext=createContext();


 export const PostContexts = ({children}) => {
  const [loading, setloading] = useState(false)
  const [post, setpost] = useState(null)
  const [posts, setposts] = useState(null)
  return (
    <PostContext.Provider value={{loading,setloading,post,setpost,posts,setposts}}>
       {children}
    </PostContext.Provider>
  )
}

export default PostContexts
