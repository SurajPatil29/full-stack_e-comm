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

		if (!decoded || !decoded.id) {
			return sendError(res, "Invalid token", 401);
		}

		req.userId = decoded.id;
		next();
	} catch (error) {
		console.error("Auth middleware error:", error.message);

		if (error.name === "TokenExpiredError") {
			return sendError(res, "TOKEN_EXPIRED", 401); // 🔥 Clear, machine-friendly message
		} else if (error.name === "JsonWebTokenError") {
			return sendError(res, "INVALID_TOKEN", 401);
		} else if (error.name === "NotBeforeError") {
			return sendError(res, "TOKEN_NOT_ACTIVE", 401);
		}

		return sendError(res, "UNAUTHORIZED", 401);
	}
};

export default auth;
