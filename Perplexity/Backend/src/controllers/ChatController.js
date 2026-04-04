import { generateResponse,GenerateTitle } from "../services/aiService.js";
import ChatModel from "../models/ChatModel.js";
import MessageModel from "../models/MessageModel.js";

export async function SendMessage(req,res) {

    const {message,chat:chatId}=req.body;

    console.log("Message:",message)
    console.log("chatId:",chatId)

    
    let title=null,chat=null;

    if(!chatId){
     title=await GenerateTitle(message);
     chat=await ChatModel.create(
        {
            user:req.user.id,
            title
        }
    )
    }
    console.log("chat",chat)

    const messagesUser=await MessageModel.create({
        chat:chatId || chat._id,
        content:message,
        role:"user"
    })


   const chatMessages=await MessageModel.find({chat:chatId || chat._id})
    console.log("ChatMessage",chatMessages)

   const response=await generateResponse(chatMessages);

   const messagesAi=await MessageModel.create({
       chat:chatId ||chat._id,
       content:response,
       role:"ai"
   })
   

    res.status(201).json({
        title,
        chat,
        messagesAi
        
    });
}

export async function GetChats(req,res) {
    const userid=req.user.id;

    const chats=await ChatModel.find({user:userid})

    res.status(200).json({message:"Chats fetched successfully",success:true,chats});
}

export async function GetChatMessages(req,res) {
    const {chatId}=req.params;

    const chat=await ChatModel.findOne({
        _id:chatId,
        user:req.user.id
    });

    if(!chat){
        return res.status(404).json({message:"Chat not found",success:false});
    }

    const messages=await MessageModel.find({chat:chatId})
   
    res.status(200).json({message:"Messages fetched successfully",success:true,messages});
}

export async function DeleteChat(req,res) {
    const {chatId}=req.params;

    const chat=await ChatModel.findOne({
        _id:chatId,
        user:req.user.id
    });

    if(!chat){
        return res.status(404).json({message:"Chat not found",success:false});
    }

    await MessageModel.deleteMany({chat:chatId});   

    await ChatModel.findByIdAndDelete(chatId);

    res.status(200).json({message:"Chat deleted successfully",success:true});
}



// 69bbb3dd774d8ff31de4c256

// 69bbb4e8d62f347fa9651e47