import { sendEmail } from "./emailService.js";

const sendEmailFun = async ({ to, subject, text, html }) => {
	const result = await sendEmail({ to, subject, text, html });
	if (!result.success) {
		throw new Error(`Email sending failed: ${result.error}`);
	}
	return result;
};

export default sendEmailFun;
