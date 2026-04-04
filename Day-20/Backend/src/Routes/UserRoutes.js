const express=require("express");
const { FollowUserController, unfollowuserController } = require("../controllers/UserController");
const identifyUser = require("../middlewares/AuthMiddelware");
const UserRouter=express.Router();


UserRouter.post("/follow/:username",identifyUser,FollowUserController)
UserRouter.post("/unfollow/:username",identifyUser,unfollowuserController)

module.exports=UserRouter;