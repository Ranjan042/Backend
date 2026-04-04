import React from 'react'
import "../style/style.scss"
const Feed = () => {
  return (
    <main>
        <div className="feed-page">
            <div className="feed">
            <div className="posts">
                <div className="post">
                        <div className="user">
                             <img src="https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                                <p>username</p>
                     </div>
                             <img src="https://images.unsplash.com/photo-1634836023845-eddbfe9937da?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGltYWdlJTIwYXN0aGV0aWMlMjBkZXNrdG9wfGVufDB8fDB8fHww" alt="" />
                    <div className="bottom">
                             <p className="caption">Caption-Caption</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </main>
  )
}

export default Feed
