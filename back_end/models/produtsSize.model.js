// models/productSizesModel.js
import mongoose from "mongoose";

const productSizesSchema = mongoose.Schema(
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

const productSizesModel = mongoose.model("product_sizes", productSizesSchema);

export default productSizesModel;
