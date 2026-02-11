const express=require("express");
const AuthRouter = require("./Routes/authRoute");
const cookieParser=require("cookie-parser")
const app=express();
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",AuthRouter);

module.exports=app;