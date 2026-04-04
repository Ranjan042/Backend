const express=require("express");
const AuthRouter=express.Router();
const UserModel = require("../models/user_model");
const jwt=require("jsonwebtoken")
const crypto = require("crypto")


AuthRouter.post("/register",async (req,res)=>{
    const {email,name,password}=req.body

    const isUserAlreadyExists=await UserModel.findOne({email});

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User With This Email Already Exists"
        })
    }
    
    const hash = crypto.createHash("md5").update(password).digest("hex")
    
    const user=await UserModel.create({
        email,password:hash,name
    })

    const Token=jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )
    res.cookie("jwt_token", Token)
    res.status(201).json({
        message:"user registered",
        user,
        Token
    })
})

AuthRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"User not found with this email address"
        })
    }
       const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "user logged in",
        user,
    })
})
module.exports=AuthRouter;