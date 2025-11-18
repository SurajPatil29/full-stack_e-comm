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
	uploadImage,
	isActiveBanner,
} from "../controllers/sliderBannerV2.controller.js";

const bannerRouterV2 = Router();

/* -------------------------- Banner Routes -------------------------- */

// ✅ Upload images separately (optional)
bannerRouterV2.post("/upload", auth, upload.array("images"), uploadImage);

// ✅ Create banner (single or multiple images)
bannerRouterV2.post("/createBanner", auth, createBanner);

// ✅ Get all banners
bannerRouterV2.get("/all", getAllBanners);

// ✅ Get single banner
bannerRouterV2.get("/:id", getBanner);

// ✅ Update banner (replace old or add new images)
bannerRouterV2.post("/:id", auth, updateBanner);

// ✅ isActive banner
bannerRouterV2.put("/:id", auth, isActiveBanner);

// ✅ Remove single image from banner
bannerRouterV2.delete("/remove-image", auth, removeBannerImage);

// ✅ Delete multiple banners
bannerRouterV2.delete("/delete-multiple", auth, deleteMultipleBanners);

// ✅ Delete single banner
bannerRouterV2.delete("/:id", auth, deleteBanner);

export default bannerRouterV2;
