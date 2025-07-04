import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGOOSE_URL = process.env.MONGODB_URL;

if (!MONGOOSE_URL) {
	throw new Error("Please provide MONGODB_URL in the .env file");
}

async function connectDB() {
	try {
		const conn = await mongoose.connect(MONGOOSE_URL);
		console.log(`✅ MongoDB connected`);
	} catch (error) {
		console.error("❌ MongoDB connect error:", error.message);
		process.exit(1);
	}
}

export default connectDB;
