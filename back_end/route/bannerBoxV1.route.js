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
} from "../controllers/bannerBoxV1.controller.js";

const bannerBoxV1Route = Router();

/* -------------------------- Banner Routes -------------------------- */

// ✅ Upload images separately (optional)
bannerBoxV1Route.post("/upload", auth, upload.array("images"), uploadImage);

// ✅ Create banner (single or multiple images)
bannerBoxV1Route.post("/createBanner", auth, createBanner);

// ✅ Get all banners
bannerBoxV1Route.get("/all", getAllBanners);

// ✅ Get single banner
bannerBoxV1Route.get("/:id", getBanner);

// ✅ Update banner (replace old or add new images)
bannerBoxV1Route.post("/:id", auth, updateBanner);

// ✅ isActive banner
bannerBoxV1Route.put("/:id", auth, isActiveBanner);

// ✅ Remove single image from banner
bannerBoxV1Route.delete("/remove-image", auth, removeBannerImage);

// ✅ Delete multiple banners
bannerBoxV1Route.delete("/delete-multiple", auth, deleteMultipleBanners);

// ✅ Delete single banner
bannerBoxV1Route.delete("/:id", auth, deleteBanner);

export default bannerBoxV1Route;
