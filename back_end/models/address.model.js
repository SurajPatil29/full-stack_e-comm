import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
	{
		name: {
			type: String,
			default: "",
		},
		address_line: {
			type: String,
			default: "",
		},
		city: {
			type: String,
			default: "",
		},
		state: {
			type: String,
			default: "",
		},
		pincode: {
			type: Number,
		},
		country: {
			type: String,
		},
		mobile: {
			type: String,
			default: null,
		},
		status: {
			type: Boolean,
			default: true,
		},
		landmark: {
			type: String,
		},
		addressType: {
			type: String,
			enum: ["Home", "Office"],
			default: "Home",
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users", // reference to UserModel
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel;
