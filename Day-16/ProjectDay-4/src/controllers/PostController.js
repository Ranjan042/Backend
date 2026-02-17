require('dotenv').config();
const ImageKit = require("@imagekit/nodejs/index.js")
const { toFile } = require("@imagekit/nodejs/index.js")
const jwt=require("jsonwebtoken")
const PostModel=require("../Models/PostModel");
const { Folders } = require('@imagekit/nodejs/resources/index.js');


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function CreatePostController(req, res) {
    console.log(req.body, req.file)

    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Token not provided,Unauthorized Access"
        })
    }
    let decoded=null;
    try{
         decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
    }catch(err){
            return res.status(401).json({
            message:"Unauthorized User"
        })
    }

    

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        Folders:"Insta-Clone Posts",
    })

    // res.send(file)
    const post=await PostModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
}

async function GetPostController(req,res) {
    const token=req.cookies.token
     if(!token){
        return res.status(401).json({
            message: "unauthorized Access"
        })
    }

    let decoded=null; //docedd me user ki id aati hai jiski token ho
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.json(401).json({
            message:"Invalid Token !"
        })
    }

    const userid=decoded.id;

    const posts=await PostModel.find({
        user:userid
    })

    res.status(200).json({
        message:"psot fetched successfully ",
        posts
    })

}

async function GetPostDetailsController(req,res){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthorized Access"
        })
    }

    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.json(401).json({
            message:"Invalid Token"
        })
    }

    const userId=decoded.id;
    const PostId=req.params.postid;

    const post=await PostModel.findById(PostId);

    if(!post){
        return res.status(404).json({message:"post not found"})
    }

    const isValidUser=post.user.toString() === userId;
    
    if(!isValidUser){
        return res.status(403).json({
            message:"Forebidden Content"
        })
    }

    return res.status(200).json({
        message:"Post Fetched Successfully",
        post
    })
}
module.exports = {
    CreatePostController,
    GetPostController,
    GetPostDetailsController
}