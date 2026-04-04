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

module.exports = {
    CreatePostController
}