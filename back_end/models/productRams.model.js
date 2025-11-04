import mongoose from "mongoose";

const productRAMsSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		dateCreated: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const productRAMsModel = mongoose.model("product_RAMs", productRAMsSchema);

export default productRAMsModel;
