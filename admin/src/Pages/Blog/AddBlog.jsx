import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { IoMdCloseCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import MyContext from "../../context/MyContext";
import { deleteImagefromCloudi, postData } from "../../utils/api";
import Editor from "react-simple-wysiwyg";

function AddBlog() {
	const context = useContext(MyContext);

	// ---------------- Form Fields ----------------
	const [formFields, setFormFields] = useState({
		images: [], // ✅ Now an array
		title: "",
		description: "",
	});

	// ---------------- Local States ----------------
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	// ---------------- Delete Single Image ----------------
	const handleDeleteBlogImg = async (imgUrl) => {
		if (!imgUrl) return;
		try {
			setIsLoading(true);

			await deleteImagefromCloudi("/api/blog/remove-image", imgUrl);

			setFormFields((prev) => ({
				...prev,
				images: prev.images.filter((img) => img !== imgUrl),
			}));
		} catch (error) {
			console.error(error);
			setMessage("❌ Failed to delete image.");
		}
		setIsLoading(false);
	};

	// ---------------- Save Blog ----------------
	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");

		try {
			setIsLoading(true);

			const result = await postData("/api/blog/create", formFields);

			if (result.success) {
				setMessage("✅ Blog added successfully");

				setFormFields({
					images: [],
					title: "",
					description: "",
				});

				setTimeout(() => {
					context.setIsOpenFullScreenPanel({ open: false });
				}, 2000);
			} else {
				setMessage(result.message || "❌ Something went wrong");
			}
		} catch (error) {
			console.error(error);
			setMessage("❌ Server error. Please try again later.");
		}

		setIsLoading(false);
	};

	// ---------------- Form Validation ----------------
	const isFormValid =
		formFields.images.length > 0 &&
		formFields.title.trim() &&
		formFields.description.trim();

	// ========================================================================
	// ------------------------- UI SECTION BELOW ------------------------------
	// ========================================================================

	return (
		<section className="p-2 sm:p-4 bg-gray-50">
			<form className="form py-3 p-2" onSubmit={handleSave}>
				<div className="max-h-[65vh] sm:max-h-[72vh] pr-2 sm:pr-4 overflow-y-auto">
					{/* Title */}
					<div className="m-3 sm:m-4">
						<h3 className="font-[500] text-[18px] mb-1">Blog Title</h3>
						<input
							type="text"
							value={formFields.title}
							required
							onChange={(e) =>
								setFormFields({ ...formFields, title: e.target.value })
							}
							className="w-full h-[40px] border rounded-sm p-3 text-sm"
						/>
					</div>

					{/* Description */}
					<div className="m-3 sm:m-4">
						<h3 className="text-[14px] font-[500] mb-1 text-black ">
							Description
						</h3>
						<Editor
							value={formFields.description}
							onChange={(e) =>
								setFormFields({ ...formFields, description: e.target.value })
							}
						/>
					</div>

					{/* Multiple Image Upload */}
					<div className="col w-full px-5">
						<h3 className="font-[500] text-[18px] mb-3">Blog Images</h3>

						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
							{/* ✅ Preview all images */}
							{formFields.images.map((img, index) => (
								<div key={index} className="relative">
									<button
										type="button"
										onClick={() => handleDeleteBlogImg(img)}
										disabled={isLoading}
										className="absolute w-[22px] h-[22px] -top-[6px] -right-[6px] z-50"
									>
										<IoMdCloseCircle className="text-red-700 text-[22px]" />
									</button>

									<div className="uploadBox rounded-md overflow-hidden border h-[110px] sm:h-[130px] bg-gray-100 flex items-center justify-center">
										<LazyLoadImage
											className="w-full h-full object-cover"
											alt="image"
											src={img}
											effect="blur"
										/>
									</div>
								</div>
							))}

							{/* ✅ UploadBox shows only if less than 10 images */}
							{formFields.images.length < 10 && (
								<UploadBox
									multiple={true}
									setImg={(updater) =>
										setFormFields((prev) => ({
											...prev,
											images:
												typeof updater === "function"
													? updater(prev.images)
													: updater,
										}))
									}
									url="/api/blog/upload"
								/>
							)}
						</div>
					</div>
				</div>

				{/* Message */}
				{message && (
					<p
						className={`text-sm mt-3 ${
							message.includes("✅") ? "text-green-600" : "text-red-500"
						}`}
					>
						{message}
					</p>
				)}

				<br />
				<hr />
				<br />

				{/* Submit */}
				<div className="w-full sm:w-[250px]">
					<Button
						type="submit"
						className="btn-blue btn-lg w-full gap-2"
						disabled={!isFormValid || isLoading}
					>
						<FaCloudUploadAlt className="text-[20px]" />
						{isLoading ? "Saving..." : "Publish & View"}
					</Button>
				</div>
			</form>
		</section>
	);
}

export default AddBlog;
