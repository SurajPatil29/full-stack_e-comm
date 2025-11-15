import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import myListRouter from "./route/myList.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import addressRouter from "./route/address.route.js";
import bannerRouter from "./route/addBanner.route.js";

// Load env variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(
	cors({
		origin: "*", // ❌ all origins
		credentials: true,
	})
); //{ origin: "http://localhost:3000", credentials: true }
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Default route
app.get("/", (req, res) => {
	res.json({ message: `Server is running on PORT ${PORT}` });
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/myList", myListRouter);
app.use("/api/address", addressRouter);
app.use("/api/banner", bannerRouter);

// app.use("*", (req, res) => {
// 	res.status(404).json({ success: false, message: "Route not found" });
// });

app.use(errorHandler);

// Connect DB and start server
connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`🚀 Server running at http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ DB Connection Failed:", err.message);
		process.exit(1);
	});
