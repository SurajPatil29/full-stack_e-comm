import mongoose from "mongoose";

const addBannerSchema = new mongoose.Schema(
	{
		images: {
			type: [String], // ✅ support multiple images
			required: true,
		},
		title: {
			type: String,
			trim: true,
		},
		isActive: {
			type: Boolean,
			default: true, // ✅ can hide/show banners without deleting
		},
	},
	{
		timestamps: true, // ✅ typo fixed (`timeStamp` → `timestamps`)
	}
);

const AddBannerModel = mongoose.model("AddBanner", addBannerSchema);
export default AddBannerModel;
