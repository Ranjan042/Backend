import express from 'express';
import AuthRouter from './routes/AuthRoutes.js';
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan"
const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",AuthRouter)

export default app;