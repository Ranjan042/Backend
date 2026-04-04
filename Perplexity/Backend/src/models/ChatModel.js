import mongoose from "mongoose";

const ChatSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type:String,
        default:"New Chat",
        trim:true
    }
},
{
    timestamps:true
}

);

const ChatModel=mongoose.model("Chat", ChatSchema);
export default ChatModel