import express from "express";
import UseGraph from "./service/GraphAi.js";
import cors from "cors";

const app=express()

app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    withCredentials:true
}))

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post("/use-graph",async(req,res)=>{
    await UseGraph("Write Factorial Function Using JS?")
})

app.post("/arena",async(req,res)=>{
  const response =await UseGraph(req.body.problem)
//   console.log(response)
  res.status(200).json(response)
})

export default app