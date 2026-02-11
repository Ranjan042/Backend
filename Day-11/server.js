const app=require("./src/app");

const ConnectTODB=require("./src/config/Database")

ConnectTODB();

app.get("/",(req,res)=>{
    res.send("Server is running");
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})