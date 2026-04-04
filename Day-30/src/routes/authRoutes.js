import { Router } from "express";
import { registerUser } from "../controller/authController.js";
import { registerValidation } from "../validator/authValidator.js";


const authRouter=Router()

authRouter.post("/register",registerValidation,registerUser)



export default authRouter;