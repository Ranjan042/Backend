const app = require("./src/app");
const ConnectTODb = require("./src/config/DataBase");

ConnectTODb();
app.listen(3000,()=>{
    console.log("Server is running on localhost 3000")
})