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
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        Folders:"Insta-Clone Posts",
    })

    // res.send(file)
    const post=await PostModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:req.user.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
}

async function GetPostController(req,res) {


    const userid=req.user.id;

    const posts=await PostModel.find({
        user:userid
    })

    res.status(200).json({
        message:"psot fetched successfully ",
        posts
    })

}

async function GetPostDetailsController(req,res){
    const userId=req.user.id;
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