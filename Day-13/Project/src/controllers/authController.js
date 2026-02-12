const UserModel = require("../Models/UserModel");
const crypto=require("crypto")
const jwt=require("jsonwebtoken")

async function registerController (req,res){
    const {email,username,password,bio,profileImage}=req.body;

    const isUserAlreadyExists=await UserModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409)
        .json({
            message:"User already exists"+
            isUserAlreadyExists.email===email ? "Email Already Exists" : "UserName Already Exists"
        })
    }

    const hash=crypto.createHash("sha256").update(password).digest('hex');

    const User=await UserModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })

    const token=jwt.sign({
        id:User._id
    },process.env.JWT_SECRET,
         { expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            email:User.email,
            username:User.username,
            bio:User.bio,
            profileImage:User.profileImage
        }
    })
}

async function loginController (req,res){
    const {username,email,password}=req.body;

    const user=await UserModel.findOne({
        $or:[{username:username},{email:email}]
    })
   
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const hash=crypto.createHash("sha256").update(password).digest('hex');

    const isPasswordValid=hash==user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"password Invalid"
        })
    }

    const token=jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"User LoggedIn Successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports={registerController,loginController};