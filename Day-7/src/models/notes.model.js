const mongoose=require("mongoose");

const noteSchema=new mongoose.Schema({
    title:String,
    description:String,
})

const noteaModel=mongoose.model("notes",noteSchema);
module.exports=noteaModel;