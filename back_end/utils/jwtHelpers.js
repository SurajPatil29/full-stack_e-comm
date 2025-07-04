import jwt from "jsonwebtoken";

export function generateToken(payload) {
	return jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET_KEY, {
		expiresIn: "1d",
	});
}
