const mongoose=require("mongoose");
require("dotenv").config();

async function ConnectTODb(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DataBase")
}

module.exports=ConnectTODb;