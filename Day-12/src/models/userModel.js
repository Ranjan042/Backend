const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Email Already Exists"]
    },
    password:String
})

const userModel=mongoose.model("user",UserSchema);