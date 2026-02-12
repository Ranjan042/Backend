const cookieParser = require("cookie-parser");
const express=require("express");
const AuthRouter = require("./Routes/AuthRoutes");


const app=express();


app.use(cookieParser);
app.use(express.json());
app.use("/api/auth",AuthRouter);


module.exports=app;