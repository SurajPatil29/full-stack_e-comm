import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generatedRefreshToken = async (userId) => {
	if (!process.env.SECRET_KEY_REFRESH_TOKEN) {
		throw new Error(
			"Refresh token secret key is not defined in environment variables"
		);
	}

	const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_REFRESH_TOKEN, {
		expiresIn: "7d",
	});

	const updateResult = await UserModel.updateOne(
		{ _id: userId },
		{ refresh_token: token }
	);

	return token;
};

export default generatedRefreshToken;
