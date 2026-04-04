const cookieParser = require("cookie-parser");
const express=require("express");
const AuthRouter = require("./Routes/AuthRoutes");
const PostRouter = require("./Routes/PostRoutes");


const app=express();
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
  console.log("Bckend is working")
});



app.use(cookieParser());
app.use(express.json());


app.use("/api/auth",AuthRouter);
app.use("/api/posts",PostRouter)


module.exports=app;