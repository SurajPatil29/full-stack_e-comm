import React from "react";
import MyContext from "../../context/MyContext";
import { useContext } from "react";
import { useState } from "react";
import {
	deleteImagefromCloudi,
	fetchDataFromApi,
	postData,
} from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadBox from "../../Components/UploadBox";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";

function EditCategory() {
	const context = useContext(MyContext);
	const [formFields, setFormFields] = useState({
		name: "",
		image: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setFormFields((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		const id = context.isOpenFullScreenPanel.id;
		fetchDataFromApi(`/api/category/${id}`).then((res) => {
			const category = res.category;
			setFormFields({ name: category.name, image: category.images });
		});
	}, []);

	const handleDeleteCatImg = async () => {
		if (!formFields.image) return;
		try {
			setIsLoading(true);
			await deleteImagefromCloudi(
				"/api/category/deleteImage",
				formFields.image
			);
			setFormFields((prev) => ({ ...prev, image: "" }));
		} catch (error) {
			console.error(error);
			setMessage("❌ Failed to delete image. Try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");
		const id = context.isOpenFullScreenPanel.id;

		const isFormValidNow =
			formFields.name.trim().length > 0 &&
			String(formFields.image).trim().length > 0;

		if (!isFormValidNow) {
			setMessage("❌ Category name and image are required");
			return;
		}

		try {
			setIsLoading(true);
			const result = await postData(`/api/category/${id}`, {
				name: formFields.name,
				images: formFields.image,
			});
			if (result.success) {
				setMessage("✅ Category updated successfully");
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
	const isFormValid = Boolean(formFields.name.trim() && formFields.image);
	return (
		<section className="p-2 bggray-50">
			<form className="form py-3 p-2" onSubmit={handleSave}>
				<div className="scroll max-h-[72vh] pr-4 overflow-y-scroll ">
					<div className="mb-3">
						<h3 className="text-[14px] font-[500] mb-1 text-black ">
							Product Category name
						</h3>

						<input
							type="text"
							className="w-[25%] h-[40%] border border-gray-300 focus:outline-none focus:border-gray-500 rounded-sm p-3 text-sm "
							name="name"
							onChange={onChangeInput}
							value={formFields.name}
							placeholder="Enter category name"
							required
						/>
					</div>
					<div className="px-5">
						<h3 className="font-[700] text-[18px] mb-3 ">category Image</h3>
						<div className="grid grid-cols-7 gap-4">
							{formFields.image ? (
								<div className="relative">
									<button
										type="button"
										onClick={handleDeleteCatImg}
										disabled={isLoading}
										className="absolute w-[20px] h-[25px] rounded-full overflow-hidden -top-[5px] -right-[5px] z-50 cursor-pointer disabled:opacity-50 "
									>
										<IoMdCloseCircle className="text-red-700 text-[20px] " />
									</button>
									<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-gray-400 h-[150px] w-full bg-gray-100 flex items-center justify-center ">
										<LazyLoadImage
											className="w-full h-full object-cover "
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
								/>
							)}
						</div>
					</div>
				</div>
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
				<div className="w-[250px]">
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

export default EditCategory;
