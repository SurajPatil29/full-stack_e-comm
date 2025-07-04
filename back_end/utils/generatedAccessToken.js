import jwt from "jsonwebtoken";

const generatedAccessToken = (userId) => {
	const secret = process.env.SECRET_KEY_ACCESS_TOKEN;
	if (!secret) {
		throw new Error(
			"Access token secret key is missing in environment variables"
		);
	}

	return jwt.sign({ id: userId }, secret, {
		expiresIn: "5h",
	});
};

export default generatedAccessToken;
