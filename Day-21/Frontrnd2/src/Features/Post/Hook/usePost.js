import { useContext } from "react";
import { GetPosts } from "../Service/PostApi";
import { PostContext } from "../Context/PostContexts";

export const UsePost=()=>{
    const context=useContext(PostContext)
    const {loading,setloading,post,setpost,posts,setposts}=context

    const handleGetposts=async ()=>{
        setloading(true)
        const data=await GetPosts()
        setposts(data.posts)
        setloading(false)
    }
    return {loading,post,posts,handleGetposts}
}