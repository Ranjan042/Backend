const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"UserName Already Exists"],
        required:[true,"username is required"],
    },
    email:{
        type:String,
        unique:[true,"email Already Exists"],
        required:[true,"email is required"],
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    }
})

const UserModel=mongoose.model("Users",UserSchema)

module.exports=UserModel;