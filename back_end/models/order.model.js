import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		products: [
			{
				productId: {
					type: mongoose.Schema.ObjectId,
					ref: "Product",
					required: true,
				},
				productsTitle: {
					type: String,
				},
				quantity: {
					type: Number,
				},
				price: {
					type: Number,
				},
				image: {
					type: String,
				},
				subTotal: {
					type: Number,
				},
			},
		],
		payment_method: {
			type: String,
			enum: ["razorpay", "paypal", "cod"],
			required: true,
		},
		paymentId: {
			type: String,
			default: "",
		},
		payment_status: {
			type: String,
			enum: ["pending", "success", "failed"],
			default: "pending",
		},
		order_status: {
			type: String,
			enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
			default: "pending",
		},
		delivery_address: {
			type: mongoose.Schema.ObjectId,
			ref: "address",
		},
		totalAmt: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
