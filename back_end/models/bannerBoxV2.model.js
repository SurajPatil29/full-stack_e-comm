import mongoose from "mongoose";

const bannerBoxV2Schema = new mongoose.Schema(
	{
		images: [
			{
				type: String,
				required: true,
			},
		],

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

		prodType: {
			type: String,
			enum: ["featured", "latest", ""],
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

const BannerBoxV2Model = mongoose.model("banner_box_v2", bannerBoxV2Schema);

export default BannerBoxV2Model;
