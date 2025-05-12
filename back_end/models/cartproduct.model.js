import mongoose from "mongoose";

const cartProductsSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.ObjectId,
			ref: "product",
		},
		quantity: {
			type: mongoose.Schema.ObjectId,
			default: 1,
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const CartProductModel = mongoose.model("cartProduct", cartProductsSchema);

export default CartProductModel;
