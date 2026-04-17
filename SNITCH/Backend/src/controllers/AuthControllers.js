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
        const {FullName,Email,PhoneNumber,Password,isSeller}=req.body;
        
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
        console.log(req.body)
        const user=await UserModel.findOne({Email});
        console.log(user)

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

export const GetMeController=async (req,res) => {
    try {
        const UserId=req.user.id;
        const user=await UserModel.findById(UserId).select("-Password");
        if(user){
            return res.status(200).json({
                success:true,
                user
            });
        }
    } catch (err) {
        // console.log(err.message)
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const GoogleCallbackController=async(req,res)=>{
    try {
        const {id,displayName,emails}=req.user;
        const email=emails[0].value;

        let user=await UserModel.findOne({Email:email});

        if(!user){
            console.log("User Created")
            user=await UserModel.create({FullName:displayName,Email:email,googleId:id,Role:"buyer"});
        }

        const token=jwt.sign({id:user._id},CONFIG.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token);
        res.redirect("http://localhost:5173/");
        
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({message:"Internal Server Error"});
    }
}