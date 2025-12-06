import mongoose from "mongoose";

const cartProductsSchema = new mongoose.Schema(
	{
		productTitle: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		oldPrice: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		subTotal: {
			type: Number,
			required: true,
		},
		productId: {
			type: mongoose.Schema.ObjectId,
			ref: "Product",
		},
		countInStock: {
			type: Number,
			required: true,
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		ProductBrand: {
			type: String,
			default: "",
		},
		size: {
			type: String,
			default: "",
		},
		ram: {
			type: String,
			default: "",
		},
		ramRange: [
			{
				type: String,
				default: "",
			},
		],
		sizeRange: [
			{
				type: String,
				default: "",
			},
		],
		weight: {
			type: String,
			default: "",
		},
		weightRange: [
			{
				type: String,
				default: "",
			},
		],
	},
	{
		timestamps: true,
	}
);

const CartProductModel = mongoose.model("cartProduct", cartProductsSchema);

export default CartProductModel;
