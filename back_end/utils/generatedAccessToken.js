import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generatedAccessToken = (userId) => {
	if (!process.env.JSON_WEB_TOKEN_SECRET_KEY) {
		throw new Error("JWT secret key is not defined in environment variables");
	}

	const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, {
		expiresIn: "5h",
	});

	const updateResult = UserModel.updateOne(
		{ _id: userId },
		{ access_token: token }
	);

	return token;
};

export default generatedAccessToken;
