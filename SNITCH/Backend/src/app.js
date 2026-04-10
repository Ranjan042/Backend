import express from 'express';
import AuthRouter from './routes/AuthRoutes.js';
import cookieParser from "cookie-parser";

const app=express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",AuthRouter)

export default app;