const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"With this email user account already exists "],
        password:String,
    }
})
const UserModel=mongoose.model("users",UserSchema);

module.exports=UserModel;