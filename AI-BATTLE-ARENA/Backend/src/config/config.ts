import { config } from "dotenv";
config();

type CONFIG = {
    readonly GEMINI_API_KEY: string,
    readonly MISTRAL_API_KEY: string
    readonly COHERE_API_KEY: string
    readonly TAVILY_API_KEY: string
}

const Config: CONFIG = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    TAVILY_API_KEY: process.env.TAVILY_API_KEY || ""
}

export default Config;