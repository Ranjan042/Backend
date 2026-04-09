import { tavily } from "@tavily/core";
import Config from "../config/config.js";

const Tavily = tavily({
  apiKey: Config.TAVILY_API_KEY,
});

export const TavilyService = async (prompt: string) => {
  try {
    console.log("Tavily Run Hua")
    const res = await Tavily.search(prompt, {
      maxResults: 3,
      searchDepth: "advanced",
      includeAnswer: true, // 🔥 important
    });

    return {
      answer: res.answer || "",
      context: res.results?.map(r => r.content) || [],
      sources: res.results?.map(r => r.url) || [],
    };
  } catch (err) {
    console.error("Tavily Error:", err);

    // ✅ safe fallback (very important for agents)
    return {
      answer: "",
      context: [],
      sources: [],
    };
  }
};