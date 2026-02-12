const Mongoose=require("mongoose");
require("dotenv").config();

function ConnectTODB(){
    Mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected To DataBase")
    })
}

module.exports=ConnectTODB;