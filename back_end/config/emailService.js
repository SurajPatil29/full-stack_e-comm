import http from "http";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//configure the SMTP transporter
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com", //e.g., "smtp.gmail.com" for Gmail
	port: 465, // or 465 for secure
	secure: true, // true for port 465, false for other ports
	auth: {
		user: process.env.EMAIL, //your SMTP user name
		pass: process.env.EMAIL_PASS, // your SMTP password
	},
});

// function to send email
async function sendEmail(to, subject, text, html) {
	try {
		if (!to) throw new Error("Recipient email is not defined");

		const info = await transporter.sendMail({
			from: `"Classyshop Support" <${process.env.EMAIL}>`,
			to,
			subject,
			text,
			html,
		});
		return { success: true, messageId: info.messageId };
	} catch (error) {
		console.error("Error sending email: ", error);
		return { success: false, error: error.message };
	}
}

export default sendEmail;
