import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";
import UserModel from "../model/UserModel.js";

export const isUserAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token;

        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        if(token){
            const decodedToken=jwt.verify(token,CONFIG.JWT_SECRET);
            req.user=decodedToken;
            next();
        }else{
            return res.status(401).json({message:"Unauthorized"});
        }
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const isSellerAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(token){
            //This gives only id
            const decodedToken=jwt.verify(token,CONFIG.JWT_SECRET);
            const user=await UserModel.findById(decodedToken.id);
            req.user=user;
            if(user.Role!=="seller"){
                return res.status(401).json({message:"Unauthorized"});
            }else{
                next();
            }
        }else{
            return res.status(401).json({message:"Unauthorized"});
        }
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({message:"Internal Server Error"});
    }
}