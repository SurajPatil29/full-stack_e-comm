import { Router } from "express";
import {
	loginUserController,
	logoutController,
	registerUserController,
	verifyEmailsController,
} from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.js";

const userRouter = Router();
userRouter.post("/register", registerUserController);
userRouter.post("/verifyEmail", verifyEmailsController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutController);

export default userRouter;
