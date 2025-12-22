import { Router } from "express";
import {
	deleteMultipleUsers,
	deleteUser,
	forgotPasswordController,
	googleLoginController,
	loginUserController,
	logoutController,
	refreshToken,
	registerUserController,
	removeImageFromCloudinary,
	resetPassword,
	updateUserDetails,
	userAvatarController,
	userCount,
	userDetails,
	verifyEmailsController,
	verifyForgotPasswordOtp,
} from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();
userRouter.post("/register", registerUserController);
userRouter.post("/verifyEmail", verifyEmailsController);
userRouter.post("/googleLogin", googleLoginController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutController);
userRouter.post(
	"/user-avatar",
	auth,
	upload.array("avatar"),
	userAvatarController
);
userRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, userDetails);
userRouter.post("/:id", auth, updateUserDetails);
userRouter.get("/userCount", auth, userCount);
userRouter.delete("/userDelete/:id", auth, deleteUser);
userRouter.delete("/multiUserDelete", auth, deleteMultipleUsers);

export default userRouter;
