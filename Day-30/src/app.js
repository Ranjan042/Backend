import express from "express"
import authRouter from "./routes/authRoutes.js"
import { handleError } from "./middleware/errorHandler.js"


const app=express()

app.use(express.json())
app.use("/api/auth",authRouter)

app.use(handleError)

export default app