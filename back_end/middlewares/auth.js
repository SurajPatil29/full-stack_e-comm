import jwt from "jsonwebtoken";
import { sendError } from "../utils/response.js";

const auth = (req, res, next) => {
	try {
		const authHeader = req.headers?.authorization || "";
		const token =
			req.cookies?.accessToken ||
			(authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

		if (!token) {
			return sendError(res, "Access token not provided", 401);
		}

		const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

		if (!decoded || !decoded.id._id) {
			return sendError(res, "Invalid token", 401);
		}
		// console.log(decoded.id._id);
		req.userId = decoded.id._id;
		// req.user = decoded.id

		next();
	} catch (error) {
		console.error("Auth middleware error:", error.message);
		return sendError(res, "Unauthorized - Invalid or expired token", 401);
	}
};

export default auth;
