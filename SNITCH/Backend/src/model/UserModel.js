import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema=new mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:false
    },
    Password:{
        type:String,
        required:function (){
            return !this.googleId;
        }
    },
    Role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer",
        required:true,
    },
    googleId:{
        type:String
    }
})


UserSchema.pre("save",async function(){
    if(this.isModified("Password")){
        this.Password=await bcrypt.hash(this.Password,10);
    }
    return;
})

UserSchema.methods.comparePassword=async function(Password){
    return await bcrypt.compare(Password,this.Password);
}

const UserModel=mongoose.model("User",UserSchema)
export default UserModel;