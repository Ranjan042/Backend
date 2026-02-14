const express=require("express");
const { CreatePostController } = require("../controllers/PostController");
const PostRouter=express.Router()
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage() })


PostRouter.post("/",upload.single("image"),CreatePostController)

module.exports=PostRouter;