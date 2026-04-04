import "dotenv/config";
import app from "./src/app.js";
import http from "http";
import ConnectToDb from "./src/config/Databse.js";
import { initSocket } from "./src/sockets/SocketServer.js";


const port = process.env.PORT || 5000;

const httpServer = http.createServer(app);

initSocket(httpServer);

ConnectToDb().then(() => {
    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err)=>{
     console.log("Database connection error:", err);
     process.exit(1);
})


