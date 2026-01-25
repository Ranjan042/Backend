// server create karna
// server ko config karna

const express=require("express");

const app=express(); //server create ho jata hai
app.use(express.json());
const notes=[]
app.get("/",(req,res)=>{
    res.send("hello World")
})
app.get("/notes",(req,res)=>{
    res.send(notes);
})

app.post("/notes",(req,res)=>{
    console.log("note added !");
    res.send("node created ranjan");
    notes.push(req.body);
})

app.delete("/notes/:index",(req,res)=>{
    console.log(req.params.index)
    res.send("Npde deleted")
    delete notes[req.params.index];
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].desc=req.body.desc;

    res.send("notes updated successfully")
})
module.exports=app;