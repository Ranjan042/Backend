const mongoose=require("mongoose");

const FollowSchema=new mongoose.Schema(
    {
    follower:{
        type:String
    },
    followee:{
        type:String
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accepted","rejected"],
            message:"status can only be pending,accepted or rejected"
        }
    }
},
        {timestamps:true}
);

FollowSchema.index({follower:1,followee:1},{unique:true})

const followModel=mongoose.model("follows",FollowSchema)

module.exports=followModel;