import app from "./src/app.js";
import {createServer} from "http";
import {Server} from "socket.io";

const httpServer=createServer(app)
const io = new Server(httpServer,{/* options*/});
//io=>Server
//socket=>single user

//on=> event ko listen karna
//emit=> event ko fire karna

io.on("connection", (socket) => {
  console.log("New Connection Created")

  socket.on("message",(msg)=>{
    console.log("user fired message event")
    console.log(msg)
    io.emit("abc",msg)
  })

  //task-> socket.emit(),socket.brodcast.emit(),io.emit()
  //task-> events,adapters->redis ,adaptersmiddelwares
  //client->socket instance

});



httpServer.listen(3000,()=>{
    console.log("Sever is running on port 3000")
})