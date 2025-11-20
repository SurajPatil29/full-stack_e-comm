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
} from "../controllers/bannerBoxV2.controller.js";

const bannerBoxV2Route = Router();

/* -------------------------- Banner Routes -------------------------- */

// ✅ Upload images separately (optional)
bannerBoxV2Route.post("/upload", auth, upload.array("images"), uploadImage);

// ✅ Create banner (single or multiple images)
bannerBoxV2Route.post("/createBanner", auth, createBanner);

// ✅ Get all banners
bannerBoxV2Route.get("/all", getAllBanners);

// ✅ Get single banner
bannerBoxV2Route.get("/:id", getBanner);

// ✅ Update banner (replace old or add new images)
bannerBoxV2Route.post("/:id", auth, updateBanner);

// ✅ isActive banner
bannerBoxV2Route.put("/:id", auth, isActiveBanner);

// ✅ Remove single image from banner
bannerBoxV2Route.delete("/remove-image", auth, removeBannerImage);

// ✅ Delete multiple banners
bannerBoxV2Route.delete("/delete-multiple", auth, deleteMultipleBanners);

// ✅ Delete single banner
bannerBoxV2Route.delete("/:id", auth, deleteBanner);

export default bannerBoxV2Route;
