//server ko create krana

const express=require("express");
const noteaModel=require("./models/notes.model");

const app=express();
app.use(express.json()) //midilware
/* 
--post
*/ 
app.post("/notes", async (req,res)=>{
    const {title,description}=req.body;

  const note=await noteaModel.create({
        title,description
    })

    res.status(201).json({
        message:"Note Created seccessfully",
        note
    })
})

app.get("/notes",async (req,res)=>{
  const notes= noteaModel.find();

  res.status(200).json({
    message:"Notes Ferched successfully",
    notes
  })
})

module.exports=app;