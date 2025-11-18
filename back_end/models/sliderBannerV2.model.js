import mongoose from "mongoose";

const sliderBannerV2 = new mongoose.Schema(
	{
		images: {
			type: [String], // ✅ support multiple images
			required: true,
		},
		title: {
			type: String,
			trim: true,
		},
		price: {
			type: Number,
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

const SliderBannerV2 = mongoose.model("slider_banner_v2", sliderBannerV2);
export default SliderBannerV2;
