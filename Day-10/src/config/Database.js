const mongoose=require("mongoose")  
require("dotenv").config();
function ConnectTODB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to DataBase")
    })
    .catch((err)=>{
        console.log(err.message);
    })
}

module.exports=ConnectTODB;