// models/productWeightsModel.js
import mongoose from "mongoose";

const productWeightsSchema = mongoose.Schema(
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

const productWeightsModel = mongoose.model(
	"product_weights",
	productWeightsSchema
);

export default productWeightsModel;
