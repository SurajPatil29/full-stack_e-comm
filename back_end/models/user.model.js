import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Provide Name"],
		},
		email: {
			type: String,
			required: [true, "Provide Email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Provide Password"],
		},
		avatar: {
			type: String,
			default: null,
		},
		mobile: {
			type: Number,
			default: null,
		},
		verify_email: {
			type: Boolean,
			default: false,
		},
		access_token: {
			type: String,
			default: "",
		},
		refresh_token: {
			type: String,
			default: "",
		},
		last_login_date: {
			type: Date,
			default: "",
		},
		status: {
			type: String,
			enum: ["Active", "Inactive", "Suspended"],
			default: "Active",
		},
		address_details: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "address",
			},
		],
		shopping_cart: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "cartProduct",
			},
		],
		orderHistory: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "order",
			},
		],
		otp: {
			type: String,
		},
		otpExpires: {
			type: Date,
		},
		role: {
			type: String,
			enum: ["ADMIN", "USER"],
			default: "USER",
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
