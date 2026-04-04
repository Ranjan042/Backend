// server ko create and config karna

const express = require("express");
const app = express();

app.use(express.json())// body read karne ke liye

const notes = [];


app.get("/",(req,res)=>{
    res.send("hello");
})

app.post("/notes", (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message:"Note Created successfully"
    })
});

app.get("/notes",(req,res)=>{
    // res.send(notes);
     res.status(200).json({
        notes:notes
    })
})

app.delete("/notes/:index",(req,res)=>{
    res.status(204).json({
        message:"Node deleted seccessfully"
    })
    delete notes[req.params.index];
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].descp=req.body.descp;
    res.status(200).json({
        message:"Node updated seccessfully"
    })
})

module.exports = app;
