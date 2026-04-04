import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/AuthValidator.js";
import { LoginController, RegisterController,VerifyEmailController, getmeController } from "../controllers/AuthController.js";
import { authUser } from "../middlewares/authMiddelware.js";

const authRouter =Router()

authRouter.post("/register",registerValidator,RegisterController)

authRouter.get("/verify-email",VerifyEmailController)

authRouter.post("/login",loginValidator,LoginController)

authRouter.get("/me",authUser,getmeController)

export default authRouter