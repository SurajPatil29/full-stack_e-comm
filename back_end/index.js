import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
// app.options("/*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);

// Default route
app.get("/", (req, res) => {
	res.json({ message: `Server is running on PORT ${PORT}` });
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);

// Connect DB and start server
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});
