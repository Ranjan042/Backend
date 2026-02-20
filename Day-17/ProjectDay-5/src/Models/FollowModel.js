const mongoose=require("mongoose");
const { modelName } = require("./PostModel");

const FollowSchema=new mongoose.Schema(
    {
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"follower is required"]
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"followee is required"],
    },
},
        {timestamps:true}
);

const followModel=mongoose.model("folows",FollowSchema)

module.exports=followModel;