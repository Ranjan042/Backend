const express=require("express");
const { CreatePostController, GetPostController, GetPostDetailsController, likepostcontroller } = require("../controllers/PostController");
const PostRouter=express.Router()
const multer=require("multer");
const identifyUser = require("../middlewares/AuthMiddelware");
const upload=multer({storage:multer.memoryStorage() })


PostRouter.post("/",upload.single("image"),identifyUser,CreatePostController)
PostRouter.get("/",identifyUser,GetPostController)
// GET/api/posts/details/:postid
// return an detail about specific post with the id. also check weather the post
// belongs to the user that the request comes from
PostRouter.get("/details/:postid",identifyUser,GetPostDetailsController)
PostRouter.post("/like/:postid",identifyUser,likepostcontroller)

module.exports=PostRouter;