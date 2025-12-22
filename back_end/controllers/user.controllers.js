import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import { VerificationEmail } from "../utils/verifyEmailTemplate.js";
import dotenv from "dotenv";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { sendError, sendSuccess } from "../utils/response.js";
import { generateToken } from "../utils/jwtHelpers.js";
dotenv.config();

export async function registerUserController(req, res, next) {
	try {
		const { name, email, password, role } = req.body;

		if (!name || !email || !password) {
			return sendError(res, "Provide name, email and password", 400);
		}
		console.log(role);

		const normalizedEmail = email.toLowerCase().trim();
		const userRole = role || "USER"; // Default USER if not passed

		let user = await UserModel.findOne({
			email: normalizedEmail,
			role: userRole,
		});

		// ✅ Early exit if user exists and is verified
		if (user) {
			if (existing.signUpWithGoogle) {
				return sendError(
					res,
					"This email is registered using Google Sign-In. Please continue with Google login.",
					400
				);
			}
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const otpExpires = Date.now() + 600000; // 10 mins
		const hashedPassword = await bcryptjs.hash(password, 10);

		// If user exists but is NOT verified → resend OTP
		if (user) {
			if (user.otpExpires && user.otpExpires > Date.now()) {
				return sendError(
					res,
					"Email already registered. OTP still valid.",
					400
				);
			}

			user.name = name;
			user.password = hashedPassword;
			user.otp = otp;
			user.otpExpires = otpExpires;
			await user.save();

			await sendEmailFun({
				to: normalizedEmail,
				subject: `Verify your ${userRole} email - Classyshop`,
				html: VerificationEmail(name, otp),
			});

			const token = generateToken({
				email: normalizedEmail,
				id: user._id,
				role: userRole,
			});
			return sendSuccess(res, "OTP expired. New OTP sent. Please verify.", {
				token,
			});
		}
		console.log("err");
		// ✅ New user registration
		user = new UserModel({
			name,
			email: normalizedEmail,
			role: userRole,
			password: hashedPassword,
			otp,
			otpExpires,
		});
		await user.save();
		console.log("err");

		await sendEmailFun({
			to: normalizedEmail,
			subject: `Verify your ${userRole} email - Classyshop`,
			html: VerificationEmail(name, otp),
		});

		const token = generateToken({
			email: normalizedEmail,
			id: user._id,
			role: userRole,
		});
		return sendSuccess(res, "User registered. Please verify your email.", {
			token,
		});
	} catch (error) {
		next(error);
	}
}

export async function verifyEmailsController(req, res, next) {
	try {
		const email = req.body.email?.trim().toLowerCase();
		const otp = req.body.otp;
		const role = req.body.role?.trim(); // New: Require role
		console.log(email, otp, role);

		if (!email || !otp || !role) {
			return sendError(res, "Email, OTP, and role are required", 400);
		}

		// Find user with matching email and role
		const user = await UserModel.findOne({ email, role });
		// console.log(user);
		if (!user) {
			// Means this email is not registered with this role
			return sendError(
				res,
				`No account found with email ${email} and role ${role}. Please check role.`,
				404
			);
		}

		const isCodeValid = user.otp === otp;
		const isNotExpired = user.otpExpires > Date.now();

		if (!isCodeValid) {
			return sendError(res, "Invalid OTP", 400);
		}

		if (!isNotExpired) {
			return sendError(res, "OTP expired", 400);
		}

		user.verify_email = true;
		user.otp = null;
		user.otpExpires = null;
		await user.save();

		return sendSuccess(res, "Email verified successfully");
	} catch (error) {
		next(error);
	}
}

export async function loginUserController(req, res, next) {
	try {
		const email = req.body.email?.trim().toLowerCase();
		const password = req.body.password;
		const role = req.body.role?.trim(); // New: Role is required

		if (!email || !password || !role) {
			return sendError(res, "Email, password, and role are required", 400);
		}

		// Find user with both email and role
		const user = await UserModel.findOne({ email, role });
		if (!user) {
			// Check if email exists with another role
			const existingUser = await UserModel.findOne({ email });
			if (existingUser) {
				return sendError(
					res,
					`This email is registered as ${existingUser.role}. Please log in as that role.`,
					400
				);
			}
			return sendError(res, "Invalid email or password", 400);
		}

		if (user && user.signUpWithGoogle) {
			return sendError(
				res,
				"This account is registered using google account. Please login normally.",
				400
			);
		}

		if (user.status !== "Active") {
			return sendError(res, "Your account is inactive. Contact admin.", 403);
		}

		if (!user.verify_email) {
			return sendError(res, "Please verify your email before logging in", 401);
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return sendError(res, "Invalid email or password", 400);
		}

		const accessToken = generatedAccessToken(user._id);
		const refreshToken = await generatedRefreshToken(user._id);

		await UserModel.findByIdAndUpdate(user._id, {
			last_login_date: new Date(),
			refresh_token: refreshToken,
		});

		const cookieOptions = {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		};

		res.cookie("accessToken", accessToken, cookieOptions);
		res.cookie("refreshToken", refreshToken, cookieOptions);

		return sendSuccess(res, "Login successful", {
			accessToken,
			refreshToken,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		next(error);
	}
}

export async function googleLoginController(req, res, next) {
	try {
		const { name, email, avatar, role, mobile } = req.body;

		if (!email || !role) {
			return sendError(res, "Email and role are required", 400);
		}

		const normalizedEmail = email.toLowerCase().trim();

		let user = await UserModel.findOne({ email: normalizedEmail, role });

		// ------------------------------------------------------------------------------------
		// 1️⃣ USER EXISTS → LOGIN FLOW
		// ------------------------------------------------------------------------------------
		if (user) {
			if (user && !user.signUpWithGoogle) {
				return sendError(
					res,
					"This account is registered using email & password. Please login normally.",
					400
				);
			}

			if (user.status !== "Active") {
				return sendError(res, "Your account is inactive. Contact admin.", 403);
			}

			const accessToken = generatedAccessToken(user._id);
			const refreshToken = await generatedRefreshToken(user._id);

			await UserModel.findByIdAndUpdate(user._id, {
				last_login_date: new Date(),
				refresh_token: refreshToken,
			});

			return sendSuccess(res, "Google Login Successful", {
				accessToken,
				refreshToken,
				user: {
					id: user._id,
					email: user.email,
					name: user.name,
					role: user.role,
					avatar: user.avatar,
				},
			});
		}

		// ------------------------------------------------------------------------------------
		// 2️⃣ NEW GOOGLE USER → CREATE ACCOUNT
		// ------------------------------------------------------------------------------------

		const newUser = await UserModel.create({
			name,
			email: normalizedEmail,
			role,
			avatar,
			mobile,
			password: "", // not needed for google users
			verify_email: true,
			signUpWithGoogle: true,
		});

		const accessToken = generatedAccessToken(newUser._id);
		const refreshToken = await generatedRefreshToken(newUser._id);

		await UserModel.findByIdAndUpdate(newUser._id, {
			last_login_date: new Date(),
			refresh_token: refreshToken,
		});

		return sendSuccess(res, "Google Sign-Up Successful", {
			accessToken,
			refreshToken,
			user: {
				id: newUser._id,
				email: newUser.email,
				name: newUser.name,
				role: newUser.role,
				avatar: newUser.avatar,
			},
		});
	} catch (error) {
		next(error);
	}
}

export async function logoutController(req, res, next) {
	try {
		const userId = req.userId;

		const cookieOptions = {
			httpOnly: true,
			secure: true,
			sameSite: "None",
		};

		res.clearCookie("accessToken", { ...cookieOptions, maxAge: 0 });
		res.clearCookie("refreshToken", { ...cookieOptions, maxAge: 0 });

		await UserModel.findByIdAndUpdate(userId, {
			refresh_token: "",
			access_token: "",
		});

		return sendSuccess(res, "Logout successful");
	} catch (error) {
		next(error);
	}
}

export async function userAvatarController(req, res, next) {
	try {
		const userId = req.userId;
		const images = req.files;

		if (!images || images.length === 0) {
			return sendError(res, "No image provided", 400);
		}

		const user = await UserModel.findById(userId);
		if (!user) {
			return sendError(res, "User not found", 404);
		}

		// 🔴 Delete old Cloudinary avatar if exists
		if (user.avatar) {
			const matches = user.avatar.match(
				/\/v\d+\/(.+)\.(jpg|jpeg|png|webp|gif)/
			);
			if (matches && matches[1]) {
				const publicId = `classyshop/classyshopProfile/${matches[1]}`;
				await cloudinary.uploader.destroy(publicId);
			}
		}

		// 🟢 Upload new image
		const options = {
			folder: "classyshop/classyshopProfile",
			use_filename: true,
			unique_filename: false,
			overwrite: true,
		};

		const uploadedImage = await cloudinary.uploader.upload(
			images[0].path,
			options
		);
		user.avatar = uploadedImage.secure_url;

		// 🧹 Clean up local file
		try {
			fs.unlinkSync(images[0].path);
		} catch (cleanupErr) {
			console.warn("Local file cleanup failed:", cleanupErr.message);
		}

		await user.save();

		return sendSuccess(res, "Avatar updated successfully", {
			_id: user._id,
			avatar: user.avatar,
		});
	} catch (error) {
		console.error("Avatar upload error:", error);
		next(error); // Forward to global error handler
	}
}

export async function removeImageFromCloudinary(req, res, next) {
	try {
		const imgUrl = req.query.img;

		if (!imgUrl) {
			return sendError(res, "Image URL is required", 400);
		}

		// ✅ Safer publicId extraction
		const match = imgUrl.match(
			/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/
		);
		if (!match || !match[1]) {
			return sendError(res, "Invalid Cloudinary image URL format", 400);
		}

		const publicId = match[1]; // e.g. classyshop/classyshopProfile/xyz123
		// console.log("🔄 Deleting Cloudinary image:", publicId);

		// ✅ Step 2: Delete from Cloudinary
		const result = await cloudinary.uploader.destroy(publicId);

		if (result.result !== "ok" && result.result !== "not found") {
			return sendError(res, "Failed to delete image from Cloudinary", 500);
		}

		// ✅ Step 3: Remove from user's avatar if applicable
		const user = await UserModel.findOne({ avatar: imgUrl });
		if (user) {
			user.avatar = null;
			await user.save();
			// console.log(`✅ Avatar removed from user ${user._id}`);
		}

		// ✅ Step 4: Return success response
		return sendSuccess(res, "Image deleted successfully from Cloudinary", {
			result,
		});
	} catch (error) {
		console.error("❌ Error deleting image:", error);
		next(error);
	}
}

export async function updateUserDetails(req, res, next) {
	try {
		const userId = req.userId;
		const { name, email, mobile, oldPassword, newPassword, confermPassword } =
			req.body;

		const user = await UserModel.findById(userId);
		if (!user) return sendError(res, "User not found", 404);

		let hashedPassword = user.password;
		let emailChanged = false;

		// --- Check if email change ---
		if (email && email.trim().toLowerCase() !== user.email) {
			emailChanged = true;

			// Require old password, new password & confirm password
			if (!oldPassword || !newPassword || !confermPassword) {
				return sendError(
					res,
					"Old, new and confirm password are required when changing email"
				);
			}

			// Verify old password
			const isMatch = await bcryptjs.compare(oldPassword, user.password);
			if (!isMatch) {
				return sendError(res, "Old password is incorrect");
			}

			// Check confirm password matches
			if (newPassword !== confermPassword) {
				return sendError(res, "Confirm password does not match new password");
			}

			// Hash new password
			const salt = await bcryptjs.genSalt(10);
			hashedPassword = await bcryptjs.hash(newPassword, salt);
		}

		// --- Password change only ---
		if (!emailChanged && (oldPassword || newPassword || confermPassword)) {
			if (!oldPassword || !newPassword || !confermPassword) {
				return sendError(
					res,
					"Old, new and confirm password are required when changing password"
				);
			}

			// Verify old password
			const isMatch = await bcryptjs.compare(oldPassword, user.password);
			if (!isMatch) {
				return sendError(res, "Old password is incorrect");
			}

			// Check confirm password matches
			if (newPassword !== confermPassword) {
				return sendError(res, "Confirm password does not match new password");
			}

			// Hash new password
			const salt = await bcryptjs.genSalt(10);
			hashedPassword = await bcryptjs.hash(newPassword, salt);
		}

		// --- Update user ---
		const updatedUser = await UserModel.findByIdAndUpdate(
			userId,
			{
				name: name?.trim() || user.name,
				email: emailChanged ? email.trim().toLowerCase() : user.email,
				mobile: mobile || user.mobile,
				password: hashedPassword,
				verify_email: emailChanged ? false : user.verify_email, // email verification flag reset if email changes
			},
			{ new: true }
		);

		return sendSuccess(res, "User updated successfully", {
			user: updatedUser,
		});
	} catch (error) {
		next(error);
	}
}

export async function forgotPasswordController(req, res, next) {
	try {
		const email = req.body.email?.trim().toLowerCase();
		const role = req.body.role?.trim(); // New: Role required

		if (!email || !role) {
			return sendError(res, "Email and role are required", 400);
		}

		// Find user with both email and role
		const user = await UserModel.findOne({ email, role });
		if (!user) {
			// If email exists with another role, inform user
			const existingUser = await UserModel.findOne({ email });
			if (existingUser) {
				return sendError(
					res,
					`This email is registered as ${existingUser.role}. Please select the correct role.`,
					400
				);
			}
			return sendError(res, "Email not registered", 404);
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		await UserModel.findByIdAndUpdate(
			user._id,
			{
				otp,
				otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
			},
			{ new: true }
		);

		await sendEmailFun({
			to: email,
			subject: "Reset Your Password - Classyshop",
			text: "",
			html: VerificationEmail(user.name, otp),
		});

		return sendSuccess(res, "OTP sent to your email");
	} catch (error) {
		next(error);
	}
}

export async function verifyForgotPasswordOtp(req, res, next) {
	try {
		const { email, otp, role } = req.body;

		if (!email || !otp || !role) {
			return sendError(res, "Email, OTP, and role are required", 400);
		}

		// Find user with both email and role
		const user = await UserModel.findOne({
			email: email.trim().toLowerCase(),
			role: role.trim(),
		});

		if (!user) {
			// If email exists for another role, notify
			const existingUser = await UserModel.findOne({
				email: email.trim().toLowerCase(),
			});
			if (existingUser) {
				return sendError(
					res,
					`This email is registered as ${existingUser.role}. Please choose the correct role.`,
					400
				);
			}
			return sendError(res, "User not found", 404);
		}

		if (otp !== user.otp) {
			return sendError(res, "Invalid OTP", 400);
		}

		if (Date.now() > user.otpExpires) {
			return sendError(res, "OTP has expired", 400);
		}

		user.otp = null;
		user.otpExpires = null;
		await user.save();

		return sendSuccess(res, "OTP verified successfully");
	} catch (error) {
		next(error);
	}
}

export async function resetPassword(req, res, next) {
	try {
		const { email, role, newPassword, confirmPassword } = req.body;

		if (!email || !role || !newPassword || !confirmPassword) {
			return sendError(
				res,
				"Email, role, new password, and confirm password are required",
				400
			);
		}

		if (newPassword !== confirmPassword) {
			return sendError(res, "Passwords do not match", 400);
		}

		if (newPassword.length < 6) {
			return sendError(res, "Password must be at least 6 characters", 400);
		}

		// Find user by email and role
		const user = await UserModel.findOne({
			email: email.trim().toLowerCase(),
			role: role.trim(),
		});
		if (!user) {
			// If email exists with another role, inform the user
			const existingUser = await UserModel.findOne({
				email: email.trim().toLowerCase(),
			});
			if (existingUser) {
				return sendError(
					res,
					`This email is registered as ${existingUser.role}. Please choose the correct role.`,
					400
				);
			}
			return sendError(res, "User not found", 404);
		}

		// Hash new password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(newPassword, salt);

		user.password = hashedPassword;
		// user.access_token = "";
		user.refresh_token = "";
		await user.save();

		return sendSuccess(res, "Password reset successful. Please login again.");
	} catch (error) {
		next(error);
	}
}

export async function refreshToken(req, res, next) {
	try {
		const tokenFromCookie = req.cookies.refreshToken;
		const tokenFromHeader = req?.headers?.authorization?.split(" ")[1];
		const refresh_token = tokenFromCookie || tokenFromHeader;
		console.log(tokenFromCookie, tokenFromHeader);

		if (!refresh_token) {
			return sendError(res, "Refresh token missing", 401);
		}

		let decoded;
		try {
			decoded = jwt.verify(refresh_token, process.env.SECRET_KEY_REFRESH_TOKEN);
		} catch (err) {
			return sendError(res, "Invalid or expired refresh token", 401);
		}

		// ✅ Correct payload extraction
		const userId = decoded.id;
		if (!userId) {
			return sendError(res, "Invalid token payload", 401);
		}

		const user = await UserModel.findById(userId);

		// Optional DB check (if you store refresh_token in DB)
		if (!user) {
			return sendError(res, "User not found", 403);
		}
		// If you want strict matching (user.refresh_token must equal refresh_token):
		// if (user.refresh_token !== refresh_token) {
		//   return sendError(res, "Token mismatch", 403);
		// }

		// Generate new access token
		const newAccessToken = await generatedAccessToken(user._id);

		// Send new access token in cookie
		res.cookie("accessToken", newAccessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // false on localhost
			sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
		});

		return sendSuccess(res, "New access token generated", {
			accessToken: newAccessToken,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

export async function userDetails(req, res, next) {
	try {
		const userId = req.userId;
		// console.log(userId);

		if (!userId) {
			return sendError(res, "User ID is required", 400);
		}

		const user = await UserModel.findById(userId)
			.select("-password -refresh_token")
			.populate({
				path: "address_details",
				model: "address",
			});

		if (!user) {
			return sendError(res, "User not found", 404);
		}

		return sendSuccess(res, "User details fetched successfully", {
			user,
		});
	} catch (error) {
		next(error);
	}
}

export async function userCount(req, res, next) {
	try {
		const [count, users] = await Promise.all([
			UserModel.countDocuments({ role: "USER" }),
			UserModel.find({ role: "USER" }).select("-password -refreshToken"),
		]);

		const safeCount = Number.isInteger(count) ? count : 0;

		return sendSuccess(res, "User count fetched successfully", {
			count: safeCount,
			users,
		});
	} catch (error) {
		next(error);
	}
}
