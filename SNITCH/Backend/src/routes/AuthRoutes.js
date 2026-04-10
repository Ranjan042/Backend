import { Router } from "express";
import { LoginController, RegisterController } from "../controllers/AuthControllers.js";
import { LoginValidator, RegisterValidator } from "../validators/AuthValidator.js";
const AuthRouter = Router();

AuthRouter.post("/register",RegisterValidator,RegisterController);

AuthRouter.post("/login",LoginValidator,LoginController);

export default AuthRouter;