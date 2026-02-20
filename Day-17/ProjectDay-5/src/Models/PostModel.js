const mongoose=require("mongoose");

const PostSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:" "
    },
    imgUrl:{
        type:String,
        required:[true,"imageUrl is required for creating a post"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User id is required for creating an"]
    }
})

const PostModel=mongoose.model("posts",PostSchema)

module.exports=PostModel;