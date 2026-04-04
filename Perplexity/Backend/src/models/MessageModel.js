import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'ai'],
        required: true,
    },
},
{timestamps:true}
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel