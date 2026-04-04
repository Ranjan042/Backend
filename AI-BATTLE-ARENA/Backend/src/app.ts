import express from "express";
import UseGraph from "./service/GraphAi.js"
const app=express()

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post("/use-graph",async(req,res)=>{
    await UseGraph("Write Factorial Function Using JS?")
})

export default app