import UserModel from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";


async function GenerateAndSetToken(User,res,message){
    const token=jwt.sign({id:User._id},CONFIG.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token);

    return res.status(200).json({
        success:true,
        user:{
            id:User._id,
            FullName:User.FullName,
            Email:User.Email,
            PhoneNumber:User.PhoneNumber,
            Role:User.Role
        },
        message:message
    });
}

export const RegisterController=async(req,res)=>{
    try {
        const {FullName,Email,PhoneNumber,Password,Role}=req.body;
        
        const user= await UserModel.findOne({$or:[{Email:Email},{PhoneNumber:PhoneNumber}]});
      
        if(user){
           return res.status(400).json({message:"User Already Exists"});
        }

        const NewUser=await UserModel.create({FullName,Email,PhoneNumber,Password,Role:isSeller?"seller":"buyer"});

        if(NewUser){
          await GenerateAndSetToken(NewUser,res,"User Created Successfully");
        }

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const LoginController=async(req,res)=>{
    try {
        const {Email,Password}=req.body;
        const user=await UserModel.findOne({Email});

        if(user){
            if(await user.comparePassword(Password)){
               await GenerateAndSetToken(user,res,"Login Successfully");
            }else{
                return res.status(400).json({message:"Invalid Password"});
            }
        }else{
            return res.status(400).json({message:"User Not Found"});
        }
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({message:"Internal Server Error"});
    }
}