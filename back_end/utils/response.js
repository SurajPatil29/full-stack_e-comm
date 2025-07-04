export const sendSuccess = (res, message, data = {}) => {
	res.status(200).json({ success: true, error: false, message, ...data });
};

export const sendError = (res, message = "Server Error", status = 500) => {
	res.status(status).json({ success: false, error: true, message });
};
