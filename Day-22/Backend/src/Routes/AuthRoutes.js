const express=require("express");
const { registerController, loginController, getMeController } = require("../controllers/authController");
const identifyUser = require("../middlewares/AuthMiddelware");

const AuthRouter=express.Router();

AuthRouter.post("/register",registerController)

AuthRouter.post("/login",loginController)

AuthRouter.get("/get-me",identifyUser,getMeController)

module.exports=AuthRouter;