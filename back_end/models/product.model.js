import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		images: [
			{
				type: String,
				required: true,
			},
		],
		brand: {
			type: String,
			default: "",
		},
		price: {
			type: Number,
			default: "",
		},
		oldPrice: {
			type: Number,
			default: "",
		},
		catName: {
			type: String,
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
		subCat: {
			type: String,
			default: "",
		},
		thirdsubCat: {
			type: String,
			default: "",
		},
		thirdsubCatId: {
			type: String,
			default: "",
		},
		countInStock: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			default: 0,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		discount: {
			type: Number,
			required: true,
		},
		sale: {
			type: Number,
			default: 0,
		},

		// ✅ Allow multiple RAM options
		productRam: [
			{
				type: String,
				default: "",
			},
		],

		// ✅ Allow multiple size options
		size: [
			{
				type: String,
				default: "",
			},
		],

		// ✅ Allow multiple weight options
		productWeight: [
			{
				type: String,
				default: "",
			},
		],

		dateCreated: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
