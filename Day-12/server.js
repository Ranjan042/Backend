const app=require("./src/app")
const ConnectTODB = require("./src/config/DataBase")
ConnectTODB()
app.listen(3000,()=>{
    console.log("Server is running on Port 3000")
})

