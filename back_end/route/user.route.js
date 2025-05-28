import { Router } from "express";
import {
	registerUserController,
	verifyEmailsController,
} from "../controllers/user.controllers.js";

const userRouter = Router();
userRouter.post("/register", registerUserController);
userRouter.post("/verifyEmail", verifyEmailsController);

export default userRouter;
