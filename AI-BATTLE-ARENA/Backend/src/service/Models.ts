import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import Config from "../config/config.js";

export const GeminiModel=new ChatGoogle({
    model:"gemini-flash-latest",
    apiKey:Config.GEMINI_API_KEY
})

export const MistralModel=new ChatMistralAI({
    model:"mistral-medium-latest",
    apiKey:Config.MISTRAL_API_KEY
})

export const CohoreModel=new ChatCohere({
    model:"command-a-03-2025",
    apiKey:Config.COHERE_API_KEY
})