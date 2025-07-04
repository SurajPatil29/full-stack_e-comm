import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS,
	},
});

export async function sendEmail({ to, subject, text, html }) {
	if (!to || !subject || (!text && !html)) {
		throw new Error("Email, subject, and content (text or html) are required");
	}

	try {
		const info = await transporter.sendMail({
			from: `"Classyshop Support" <${process.env.EMAIL}>`,
			to,
			subject,
			text,
			html,
		});
		return { success: true, messageId: info.messageId };
	} catch (error) {
		return { success: false, error: error.message };
	}
}
