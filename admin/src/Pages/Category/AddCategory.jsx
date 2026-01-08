import React, { useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { IoMdCloseCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { deleteImagefromCloudi, postData } from "../../utils/api";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

function AddCategory() {
	const context = useContext(MyContext);
	const [formFields, setFormFields] = useState({
		name: "",
		image: "", // store only 1 image url for category
	});
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	// Handle category name input
	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setFormFields((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Delete uploaded image
	const handleDeleteCatImg = async () => {
		if (!formFields.image) return;
		try {
			setIsLoading(true);
			await deleteImagefromCloudi(
				"/api/category/deleteImage",
				formFields.image
			);
			setFormFields((prev) => ({ ...prev, image: "" }));
		} catch (err) {
			console.error(err);
			setMessage("❌ Failed to delete image. Try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// Save category
	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");

		// Extra safety: validate again inside
		const isFormValidNow =
			formFields.name.trim().length > 0 && formFields.image.trim().length > 0;

		if (!isFormValidNow) {
			setMessage("❌ Category name and image are required");
			return;
		}

		try {
			setIsLoading(true);
			const result = await postData(`/api/category/create`, formFields);
			if (result.success) {
				setMessage("✅ Category created successfully");
				setFormFields({ name: "", image: "" });
				setTimeout(() => {
					context.setIsOpenFullScreenPanel({
						open: false,
					});
				}, 3000);
			} else {
				setMessage(result.message || "❌ Something went wrong");
			}
		} catch (error) {
			console.error(error);
			setMessage("❌ Server error. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid = formFields.name.trim() && formFields.image;

	return (
		<section className="p-2 bg-gray-50">
			<form className="form py-3 p-2" onSubmit={handleSave}>
				<div className="scroll max-h-[60vh] sm:max-h-[72vh] pr-2 sm:pr-4 overflow-y-auto">
					{/* Category Name */}
					<div className="mb-3">
						<h3 className="text-[14px] font-[500] mb-1 text-black">
							Product Category Name
						</h3>
						<input
							type="text"
							className="w-full sm:w-[50%] lg:w-[25%] h-[40px] border border-gray-300	focus:outline-none focus:border-gray-500 rounded-sm p-3 text-sm"
							name="name"
							onChange={onChangeInput}
							value={formFields.name}
							placeholder="Enter category name"
							required
						/>
					</div>

					{/* Category Image */}
					<div className="px-2 sm:px-5">
						<h3 className="font-[700] text-[18px] mb-3">Category Image</h3>
						<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
							{formFields.image ? (
								<div className="relative">
									<button
										type="button"
										onClick={handleDeleteCatImg}
										disabled={isLoading}
										className="absolute w-[20px] h-[25px] rounded-full overflow-hidden 
										-top-[5px] -right-[5px] z-50 cursor-pointer disabled:opacity-50"
									>
										<IoMdCloseCircle className="text-red-700 text-[20px]" />
									</button>
									<div
										className="uploadBox p-0 rounded-md overflow-hidden border 
									border-dashed border-gray-400 h-[120px] sm:h-[150px] w-full bg-gray-100 flex items-center justify-center"
									>
										<LazyLoadImage
											className="w-full h-full object-cover"
											alt="Category"
											src={formFields.image}
											effect="blur"
										/>
									</div>
								</div>
							) : (
								<UploadBox
									multiple={false}
									setImg={(url) =>
										setFormFields((prev) => ({ ...prev, image: url }))
									}
									url="/api/category/uploadImages"
								/>
							)}
						</div>
					</div>
				</div>

				{/* Error/Success Message */}
				{message && (
					<p
						className={`text-sm mt-3 ${
							message.includes("✅") ? "text-green-600" : "text-red-500"
						}`}
					>
						{message}
					</p>
				)}

				<hr className="my-4" />

				{/* Submit Button */}
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

export default AddCategory;
