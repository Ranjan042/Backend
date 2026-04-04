import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs";

const pc=new Pinecone({
    apiKey:process.env.PINECONE_API_KEY,
})
const Index= pc.index("cohort2-rag")

// const dataBuffer = fs.readFileSync("./story.pdf");

// const parser=new PDFParse({
//     data:dataBuffer
// })

// const data=await parser.getText()
// console.log(data)

const embeddings=new MistralAIEmbeddings({
    api_key:process.env.MISTRAL_API_KEY,
    model:"mistral-embed"
})

// const spliter=new RecursiveCharacterTextSplitter({
//     chunkSize:500,
//     chunkOverlap:0,
// })

// const chunks= await spliter.splitText(data.text)

// const docs=await Promise.all(chunks.map(async (chunk)=>{
//    const embedding=await embeddings.embedQuery(chunk)
//    return {
//        text:chunk,
//        embedding
//    }
// }))

// const result=await Index.upsert({
//     records:docs.map((doc,i)=>({
//         id:`doc-${i}`,
//         values:doc.embedding,
//         metadata:{
//             text:doc.text
//         }
//     }))
// })

// console.log(result)

const queryEmbedding=await embeddings.embedQuery("How Was the internship ecperience?");

// console.log(queryEmbedding)

const result=await Index.query({
    vector:queryEmbedding,
    topK:2,
    includeMetadata:true
})

console.log(JSON.stringify(result))