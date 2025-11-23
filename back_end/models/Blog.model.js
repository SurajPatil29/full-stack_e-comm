import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
	{
		images: [
			{
				type: String,
				required: true,
			},
		],
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const BlogModel = mongoose.model("blog", blogSchema);

export default BlogModel;
