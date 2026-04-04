const express=require("express");
const AuthRouter=express.Router();
const UserModel = require("../models/user_model");
const jwt=require("jsonwebtoken")

AuthRouter.post("/register",async (req,res)=>{
    const {email,name,password}=req.body

    const isUserAlreadyExists=await UserModel.findOne({email});

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User With This Email Already Exists"
        })
    }
    const user=await UserModel.create({
        email,password,name
    })

    const Token=jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )
    res.status(201).json({
        message:"user registered",
        user,
        Token
    })
})

module.exports=AuthRouter;