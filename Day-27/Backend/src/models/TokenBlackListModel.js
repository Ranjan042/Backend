const mongoose=require("mongoose")

const BlackListSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required for blacklisting"]
    }
},{
    timestamps:true
})

const BlackListModel=mongoose.model("blacklsit",BlackListSchema)
module.exports=BlackListModel