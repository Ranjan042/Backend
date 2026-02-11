const express=require("express");

const app=express();

// app.get("/",(req,res)=>{
//     console.log("Hello World");
//     res.send("hello world")
// })
app.use(express.json());
let notes=[];

app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.send("node created")
})
app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.listen("5173")