import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {HumanMessage, SystemMessage,AIMessage} from "langchain";
import {ChatMistralAI} from "@langchain/mistralai";

const GeminiModel=new ChatGoogleGenerativeAI({
    model:"gemini-flash-latest",
    apiKey:process.env.GOOGLE_API_KEY
})

const MisteralModel=new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRAL_API_KEY
})

export async function generateResponse(messages) {

 try {

    const response=await GeminiModel.invoke(messages.map((msg)=>{
        if(msg.role==="user"){
            return new HumanMessage(msg.content);
        }else if(msg.role==="ai"){
            return new AIMessage(msg.content);
        }
    }));

    return response.text
 } catch (err) {
    return err.response.text;
 }
}

export async function GenerateTitle(message) {
 const response=await MisteralModel.invoke([
     new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for chat conversations
        
        user will provide you with the first message of a chat conversation,and you will generate a title for the conversation that 
        capture the essence of the conversation in a 2-4 words.The title should be short and to the point,relevant and engaging
        giving users a quick understanding of what the conversation is about.

        `),
        new HumanMessage(`
            Generate a title for this conversation based on the following message:${message}
        .`),
 ])

 return response.text;
}