import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
	createBanner,
	getAllBanners,
	getBanner,
	updateBanner,
	removeBannerImage,
	deleteBanner,
	deleteMultipleBanners,
	uploadImage, // ✅ include this if you want standalone image upload route
} from "../controllers/addBanner.controller.js";

const bannerRouter = Router();

/* -------------------------- Banner Routes -------------------------- */

// ✅ Upload images separately (optional)
bannerRouter.post("/upload", auth, upload.array("images"), uploadImage);

// ✅ Create banner (single or multiple images)
bannerRouter.post("/createBanner", auth, createBanner);

// ✅ Get all banners
bannerRouter.get("/all", auth, getAllBanners);

// ✅ Get single banner
bannerRouter.get("/:id", auth, getBanner);

// ✅ Update banner (replace old or add new images)
bannerRouter.post("/:id", auth, updateBanner);

// ✅ Remove single image from banner
bannerRouter.delete("/remove-image", auth, removeBannerImage);

// ✅ Delete multiple banners
bannerRouter.delete("/delete-multiple", auth, deleteMultipleBanners);

// ✅ Delete single banner
bannerRouter.delete("/:id", auth, deleteBanner);

export default bannerRouter;
