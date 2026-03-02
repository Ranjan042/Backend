import React from 'react'
import {RiBookmarkLine, RiChat1Line, RiHeart2Line, RiShareForwardLine} from "@remixicon/react"
const Post = ({user,post}) => {
    // console.log(user)
    console.log(post)
  return (
    <div className='Post'>
     <div className="PerDetail">
        <img src={user.profileImage} alt="" />
        <p>{user.username}</p>
     </div>
     <div className="image">
        <img src={post.imgUrl} alt="" />
     </div>
     <div className="icons">
        <div className="left">
           <RiHeart2Line size={28} color="white" />
            <RiChat1Line size={28} color='white' />
           <RiShareForwardLine size={28} color='white' />
        </div>
        <div className="right">
            <RiBookmarkLine size={28} color='white' />
        </div>
     </div>
    <div className="caption">
        <p>{post.caption}</p>
    </div>
    </div>
  )
}

export default Post
