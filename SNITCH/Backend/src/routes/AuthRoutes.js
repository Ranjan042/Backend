import { Router } from "express";
import { GetMeController, GoogleCallbackController, LoginController, RegisterController } from "../controllers/AuthControllers.js";
import { LoginValidator, RegisterValidator } from "../validators/AuthValidator.js";
import passport from "passport";
import { isUserAuthenticated } from "../middlewares/AuthMiddleware.js";
const AuthRouter = Router();

AuthRouter.post("/register",RegisterValidator,RegisterController);

AuthRouter.post("/login",LoginValidator,LoginController);

AuthRouter.get("/me",isUserAuthenticated,GetMeController);

AuthRouter.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));

AuthRouter.get("/google/callback", passport.authenticate("google", {session: false,failureRedirect:"http://localhost:5173/login"},),GoogleCallbackController);
export default AuthRouter;