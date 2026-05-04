import { config } from "dotenv";
config();

if(!process.env.PORT){throw new Error("PORT is not defined")}
if(!process.env.MONGO_URI){throw new Error("MONGO_URI is not defined")}
if(!process.env.JWT_SECRET){throw new Error("JWT_SECRET is not defined")}
if(!process.env.GOOGLE_CLIENT_ID){throw new Error("GOOGLE_CLIENT_ID is not defined")}
if(!process.env.GOOGLE_CLIENT_SECRET){throw new Error("GOOGLE_CLIENT_SECRET is not defined")}
if(!process.env.IMAGEKIT_PRIVATE_KEY){throw new Error("IMAGEKIT_PRIVATE_KEY is not defined")}
if(!process.env.RPAY_KEY_ID){throw new Error("RPAY_KEY_ID is not defined")}
if(!process.env.RPAY_KEY_SECRET){throw new Error("RPAY_KEY_SECRET is not defined")}
const CONFIG={
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    RPAY_KEY_ID: process.env.RPAY_KEY_ID,
    RPAY_KEY_SECRET: process.env.RPAY_KEY_SECRET
}

export default CONFIG;