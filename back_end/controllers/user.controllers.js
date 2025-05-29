import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import dotenv from "dotenv";
import { response } from "express";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
dotenv.config();

export async function registerUserController(req, res) {
	try {
		let user;
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({
				message: "Provide email, name, password",
				error: true,
				success: false,
			});
		}

		user = await UserModel.findOne({ email: email });
		if (user) {
			return res.json({
				message: "User already Registered with this email",
				error: true,
				success: false,
			});
		}

		const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

		const salt = await bcryptjs.genSalt(10);
		const hashPassword = await bcryptjs.hash(password, salt);

		user = new UserModel({
			email: email,
			password: hashPassword,
			name: name,
			otp: verifyCode,
			otpExpires: Date.now() + 600000,
		});

		await user.save();

		// Send verificaton email
		await sendEmailFun({
			to: email,
			subject: "Verify email from Ecommerce App",
			text: "",
			html: VerificationEmail(name, verifyCode),
		});

		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JSON_WEB_TOKEN_SECRET_KEY
		);

		return res.status(200).json({
			success: true,
			error: false,
			message: "User registered successfully Please verify your email.",
			token: token, // Optimal : include this if needed for verification
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function verifyEmailsController(req, res) {
	try {
		const { email, otp } = req.body;

		const user = await UserModel.findOne({ email: email });

		if (!user) {
			return res.status(400).json({
				message: "Invalid code",
				error: true,
				success: false,
				message: "User not found",
			});
		}

		const isCodeValid = user.otp === otp;
		const isNotExpired = user.otpExpires > Date.now();

		if (isCodeValid && isNotExpired) {
			user.verify_email = true;
			user.otp = null;
			user.otpExpires = null;
			await user.save();
			return res.status(200).json({
				error: false,
				success: true,
				message: "Email verified successfully",
			});
		} else if (!isCodeValid) {
			return res
				.status(400)
				.json({ error: true, success: false, message: "Invalid OTP" });
		} else {
			return res
				.status(400)
				.json({ error: true, success: false, message: "OTP expired" });
		}
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function loginUserController(req, res) {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email: email });

		if (!user) {
			return res.status(400).json({
				message: "user not register",
				error: true,
				success: false,
			});
		}

		if (user.status !== "Active") {
			return res.status(400).json({
				message: "Contact to admin",
				error: true,
				success: false,
			});
		}

		const checkPassword = await bcryptjs.compare(password, user.password);

		if (!checkPassword) {
			return res.status(400).json({
				message: "Check your password",
				error: true,
				success: false,
			});
		}

		const accesstoken = await generatedAccessToken(user._id);
		const refreshToken = await generatedRefreshToken(user._id);

		const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
			last_login_date: new Date(),
		});

		const cookiesOption = {
			htpOnly: true,
			secure: true,
			sameSite: "None",
		};

		res.cookie("accessToken", accesstoken, cookiesOption);
		res.cookie("refreshToken", refreshToken, cookiesOption);

		return res.json({
			message: "Login successfully",
			error: false,
			success: true,
			data: {
				accesstoken,
				refreshToken,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function logoutController(req, res) {
	try {
		const userid = req.userId; //middleware

		const cookiesOption = {
			httpOnly: true,
			secure: true,
			sameSite: "None",
		};

		res.clearCookie("accessToken", cookiesOption);
		res.clearCookie("refreshToken", cookiesOption);

		const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
			refresh_token: "",
			access_token: "",
		});

		return res.json({
			message: "Logout successfully",
			error: false,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}
