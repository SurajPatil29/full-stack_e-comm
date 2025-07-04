import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generatedRefreshToken = async (userId, saveInDB = true) => {
	const secret = process.env.SECRET_KEY_REFRESH_TOKEN;
	if (!secret) {
		throw new Error(
			"Refresh token secret key is missing in environment variables"
		);
	}

	const token = jwt.sign({ id: userId }, secret, {
		expiresIn: "7d",
	});

	// Optional: Save to DB if needed (e.g. for logout/invalidation)
	if (saveInDB) {
		await UserModel.findByIdAndUpdate(userId, { refresh_token: token });
	}

	return token;
};

export default generatedRefreshToken;
