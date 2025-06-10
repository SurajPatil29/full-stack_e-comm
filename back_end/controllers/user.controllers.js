import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import dotenv from "dotenv";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { error } from "console";
import { response } from "express";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.cloudinary_Config_Cloud_Name,
	api_key: process.env.cloudinary_Config_api_key,
	api_secret: process.env.cloudinary_Config_api_secret,
	secure: true,
});

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

		if (user.verify_email !== true) {
			return res.status(400).json({
				message: "Your Email is not verify yet please verify your email first",
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

export async function userAvatarController(req, res) {
	try {
		const userId = req.userId;
		const images = req.files; // should be an array of images

		if (!images || images.length === 0) {
			return res.status(400).json({ message: "No image provided" });
		}

		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// 🔴 Step 1: Delete old image from Cloudinary if exists
		if (user.avatar) {
			const match = user.avatar.match(
				/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
			);
			if (match && match[1]) {
				const publicId = match[1]; // classyshop/classyshopProfile/xxx
				await cloudinary.uploader.destroy(publicId);
			}
		}

		// 🟢 Step 2: Upload new image
		const options = {
			folder: "classyshop/classyshopProfile",
			use_filename: true,
			unique_filename: false,
			overwrite: false,
		};

		const imageUrls = [];

		for (let i = 0; i < images.length; i++) {
			const result = await cloudinary.uploader.upload(images[i].path, options);
			imageUrls.push(result.secure_url);
			fs.unlinkSync(images[i].path); // clean up local file
		}

		// 🟢 Step 3: Update user avatar
		user.avatar = imageUrls[0]; // only store first uploaded image
		await user.save();

		return res.status(200).json({
			_id: user._id,
			avatar: user.avatar,
			success: true,
		});
	} catch (error) {
		console.error("Avatar upload error:", error);
		return res.status(500).json({
			message: error.message || "Internal server error",
			success: false,
		});
	}
}

export async function removeImageFromCloudinary(req, res) {
	try {
		const imgUrl = req.query.img;

		if (!imgUrl) {
			return res.status(400).json({ error: "Image URL is required" });
		}

		// Step 1: Extract public_id
		const match = imgUrl.match(
			/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
		);

		if (!match || !match[1]) {
			return res
				.status(400)
				.json({ error: "Invalid Cloudinary image URL format" });
		}

		const publicId = match[1]; // e.g., classyshop/classyshopProfile/1749098872984_shani_stotra
		console.log("Deleting Cloudinary image with public_id:", publicId);

		// Step 2: Delete from Cloudinary
		const result = await cloudinary.uploader.destroy(publicId);

		if (result.result !== "ok") {
			return res
				.status(404)
				.json({ error: "Image not found on Cloudinary", result });
		}

		// Step 3: Remove image URL from user document
		const user = await UserModel.findOne({ avatar: imgUrl });

		if (user) {
			user.avatar = null; // or "" based on your schema default
			await user.save();
			console.log(`Removed avatar URL from user ${user._id}`);
		} else {
			console.warn("No user found with this avatar URL.");
		}

		// Step 4: Return response
		return res.status(200).json({
			message: "Image deleted from Cloudinary and removed from user profile",
			result,
		});
	} catch (error) {
		console.error("Cloudinary deletion error:", error);
		return res.status(500).json({ error: "Server error while deleting image" });
	}
}

export async function updateUserDetails(req, res) {
	try {
		const userId = req.userId;
		const { name, email, mobile, password } = req.body;

		const userExist = await UserModel.findById(userId);
		if (!userExist) {
			return res.status(400).send("The user cannot be Updated!");
		}

		let verifyCode = "";

		if (email !== userExist.email) {
			verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
		}

		let hashPassword = "";

		if (password) {
			const slat = await bcryptjs.genSalt(10);
			hashPassword = await bcryptjs.hash(password, slat);
		} else {
			hashPassword = userExist.password;
		}

		const updateUser = await UserModel.findByIdAndUpdate(
			userId,
			{
				name: name,
				mobile: mobile,
				email: email,
				verify_email: email !== userExist.email ? false : true,
				password: hashPassword,
				otp: verifyCode !== "" ? Date.now() + 600000 : "",
			},
			{ new: true }
		);

		if (email !== userExist.email) {
			await sendEmailFun({
				sendTo: email,
				subject: "Verify email from Ecommerce App",
				text: "",
				html: VerificationEmail(name, verifyCode),
			});
		}

		return res.json({
			message: "User update successfully",
			error: false,
			success: true,
			user: updateUser,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function forgotPasswordController(req, res) {
	try {
		const { email } = req.body;

		const user = await UserModel.findOne({ email: email });

		if (!user) {
			return res.status(400).json({
				message: "Email not available",
				error: true,
				success: false,
			});
		}

		let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

		const updateUser = await UserModel.findByIdAndUpdate(
			user?.id,
			{
				otp: verifyCode,
				otpExpires: Date.now() + 600000,
			},
			{ new: true }
		);

		await sendEmailFun({
			to: email,
			subject: "Verify email from Ecommerce App",
			text: "",
			html: VerificationEmail(user.name, verifyCode),
		});

		return res.json({
			message: "Check your email",
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

export async function verifyForgotPasswordOtp(req, res) {
	try {
		const { email, otp } = req.body;

		const user = await UserModel.findOne({ email: email });

		if (!user) {
			return res.status(400).json({
				message: "Email not available",
				error: true,
				success: false,
			});
		}

		if (!email || !otp) {
			return res.status(400).json({
				message: "Provide required field email, otp.",
				error: true,
				success: false,
			});
		}

		if (otp !== user.otp) {
			return res.status(400).json({
				message: " Invalid OTP",
				error: true,
				success: false,
			});
		}

		const currentTime = new Date().toISOString();
		if (user.otpExpires < currentTime) {
			return res.status(400).json({
				message: "OTP is expired",
				error: true,
				success: false,
			});
		}

		user.otp = "";
		user.otpExpires = "";

		await user.save();

		return res.status(200).json({
			message: "Verified OTP successfully",
			error: false,
			success: true,
		});
	} catch (error) {
		return res(404).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function resetPassword(req, res) {
	try {
		const { email, newPassword, confirmPassword } = req.body;

		if (!email || !newPassword || !confirmPassword) {
			return res.status(400).json({
				message: "Provide required fields email, newPassword, confirmPassword",
			});
		}

		const user = await UserModel.findOne({ email: email });
		if (!user) {
			return res.status(400).json({
				message: "Email is not available",
				error: true,
				success: false,
			});
		}

		if (newPassword !== confirmPassword) {
			return res.status(400).json({
				message: "newPassword and confirmPassword must be same",
				error: true,
				success: false,
			});
		}

		const salt = await bcryptjs.genSalt(10);
		const hashPassword = await bcryptjs.hash(newPassword, salt);

		const update = await UserModel.findByIdAndUpdate(user._id, {
			password: hashPassword,
		});

		return res.json({
			message: "Password update successfully",
			error: false,
			success: true,
		});
	} catch (error) {
		return res.status(404).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function refreshToken(req, res) {
	try {
		const refresh_token =
			req.cookies.refresh_token || req?.headers?.authorization?.split(" ")[1]; // [bearer token]
		// console.log(refresh_token);
		if (!refresh_token) {
			return res.status(401).json({
				message: "Invalid token",
				error: true,
				success: false,
			});
		}

		const verifyToken = await jwt.verify(
			refresh_token,
			process.env.SECRET_KEY_ACCESS_TOKEN
		);

		if (!verifyToken) {
			return res.status(401).json({
				message: "token is exprired",
				error: true,
				success: false,
			});
		}

		const userId = verifyToken?._id;
		const newAccessToken = await generatedAccessToken(userId);

		const cookiesOption = {
			httpOnly: true,
			secure: true,
			sameSite: "None",
		};

		res.cookie("accessToken", newAccessToken, cookiesOption);

		return res.json({
			message: "New Access token generated",
			error: false,
			success: true,
			date: {
				accessToken: newAccessToken,
			},
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}

export async function userDetails(req, res) {
	try {
		const userId = req.userId;

		const user = await UserModel.findById(userId).select(
			"-password -refresh_token"
		);

		return res.json({
			message: "user details",
			data: user,
			error: false,
			success: true,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message || error,
			error: true,
			success: false,
		});
	}
}
