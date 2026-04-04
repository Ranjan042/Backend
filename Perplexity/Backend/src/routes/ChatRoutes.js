import {Router} from "express";
import { SendMessage,GetChats, GetChatMessages, DeleteChat } from "../controllers/ChatController.js";
import  {authUser}  from "../middlewares/authMiddelware.js";

const chatRouter=Router();

chatRouter.post("/message",authUser,SendMessage);

chatRouter.get("/",authUser,GetChats);

chatRouter.get("/:chatId/messages",authUser,GetChatMessages);

chatRouter.delete("/delete/:chatId",authUser,DeleteChat); 

export default chatRouter;

// 69bbacd264b234ca956033fb

// 69bbaf5464b234ca9560342e