import sendEmail from "./emailService.js";

const sendEmailFun = async ({ to, subject, text, html }) => {
	const result = await sendEmail(to, subject, text, html);
	if (result.success) {
		return true;
		//res.status(200)json({message : "email sent successfully", messageId : result.messageId})
	} else {
		return false;
		// res.status(500).json({message: "failed to sent email", error : result.error})
	}
};

export default sendEmailFun;
