import mongoose from "mongoose";

const bannerBoxV1Schema = mongoose.Schema(
	{
		title: {
			type: String,
			default: "",
		},
		images: [
			{
				type: String,
				required: true,
			},
		],
		price: {
			type: Number,
			default: "",
		},
		catId: {
			type: String,
			default: "",
		},
		subCatId: {
			type: String,
			default: "",
		},
		thirdsubCatId: {
			type: String,
			default: "",
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		angle: {
			type: String,
			default: "Right",
		},
		slide: {
			type: String,
			default: "horizontal",
			enum: ["horizontal", "vertical"],
		},
	},
	{
		timestamps: true,
	}
);

const BannerBoxV1Model = mongoose.model("banner_box_v1", bannerBoxV1Schema);

export default BannerBoxV1Model;
