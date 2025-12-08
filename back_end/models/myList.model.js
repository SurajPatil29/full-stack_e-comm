import mongoose from "mongoose";

const myListSchema = new mongoose.Schema(
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

		productId: {
			type: mongoose.Schema.ObjectId,
			ref: "Product",
		},

		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		ProductBrand: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const MyListModel = mongoose.model("MyList", myListSchema);
export default MyListModel;
