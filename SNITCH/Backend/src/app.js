import express from 'express';
import AuthRouter from './routes/AuthRoutes.js';
import cookieParser from "cookie-parser";
import morgan from "morgan"
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import CONFIG from "./config/config.js";
import cors from "cors"
import ProductRouter from './routes/ProductRoute.js';

const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: CONFIG.GOOGLE_CLIENT_ID,
    clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}))

app.get("/",(req,res)=>{
 res.status(200).json({ message: "Server is running" });
})

app.use("/api/auth",AuthRouter)
app.use("/api/products",ProductRouter)

export default app;