import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Provide Name"],
			trim: true,
			minlength: 2,
		},
		email: {
			type: String,
			required: [true, "Provide Email"],
			lowercase: true,
			trim: true,
			index: true,
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
			type: String,
			default: null,
			trim: true,
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
			default: null,
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
		otp: String,
		otpExpires: Date,
		role: {
			type: String,
			enum: ["ADMIN", "USER"],
			default: "USER",
		},
		// Optional soft-delete flag
		isDeleted: {
			type: Boolean,
			default: false,
			select: false,
		},
	},
	{ timestamps: true }
);

// Ensure unique email per role
userSchema.index({ email: 1, role: 1 }, { unique: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
