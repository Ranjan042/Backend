import mongoose from "mongoose";
import CONFIG from "./config.js";



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(CONFIG.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;