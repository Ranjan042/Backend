import React, { useEffect } from 'react'
import Post from '../Container/Post'
import "../Style/Style.css"
import { UsePost } from '../Hook/usePost'
const FeedPage = () => {

    const {posts,handleGetposts,loading}=UsePost()

    useEffect(() => {
        handleGetposts()
    }, [])

    if(loading || !posts){
        return (<main><h1>Feed is loading........</h1></main>)
    }
    

  return (
    <div className='FeedPage'>
        <div className="Feed">
           {
            posts.map(post=>{
                return <Post user={post.user} post={post} />
            })
           }
        </div>
    </div>
  )
}

export default FeedPage
