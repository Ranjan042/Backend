import "dotenv/config";
import mongoose from "mongoose";

const ConnectToDb=async () => {
    const conn=await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected with ${conn.connection.host}`);
}

export default ConnectToDb;