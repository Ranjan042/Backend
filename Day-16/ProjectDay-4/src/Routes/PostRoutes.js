const express=require("express");
const { CreatePostController, GetPostController, GetPostDetailsController } = require("../controllers/PostController");
const PostRouter=express.Router()
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage() })


PostRouter.post("/",upload.single("image"),CreatePostController)
PostRouter.get("/",GetPostController)
// GET/api/posts/details/:postid
// return an detail about specific post with the id. also check weather the post
// belongs to the user that the request comes from
PostRouter.get("/details/:postid",GetPostDetailsController)

module.exports=PostRouter;