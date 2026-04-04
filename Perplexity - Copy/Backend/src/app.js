import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/AuthRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import chatRouter from './routes/ChatRoutes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    // origin:"https://localhost:5174",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}));
app.use(morgan("dev"));

app.use("/api/auth",authRouter);
app.use("/api/chats",chatRouter);

app.get('/', (req, res) =>
    res.send('Hello World!'
    ));



export default app
