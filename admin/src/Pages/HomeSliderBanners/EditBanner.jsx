import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import {
	fetchDataFromApi,
	postData,
	deleteImagefromCloudi,
} from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadBox from "../../Components/UploadBox";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";

function EditBanner() {
	const context = useContext(MyContext);
	const [formFields, setFormFields] = useState({
		image: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	// ✅ Fetch existing banner details
	useEffect(() => {
		const id = context.isOpenFullScreenPanel.id;
		if (!id) return;

		fetchDataFromApi(`/api/banner/${id}`).then((res) => {
			if (res?.data) {
				const banner = res.data;
				// console.log(banner.images);
				setFormFields({
					image: banner.images || "",
				});
			}
		});
	}, []);

	// ✅ Delete banner image from Cloudinary
	const handleDeleteBannerImg = async () => {
		if (!formFields.image) return;
		try {
			setIsLoading(true);
			const res = await deleteImagefromCloudi(
				"/api/banner/remove-image",
				formFields.image
			);
			console.log(res);
			setFormFields((prev) => ({ ...prev, image: "" }));
			setMessage("✅ Image removed successfully");
		} catch (error) {
			console.error(error);
			setMessage("❌ Failed to delete image. Try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// ✅ Save updated banner
	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");
		const id = context.isOpenFullScreenPanel.id;

		if (!formFields.image.trim()) {
			setMessage("❌ Banner image are required");
			return;
		}

		try {
			setIsLoading(true);
			const result = await postData(`/api/banner/${id}`, {
				images: formFields.image,
			});

			if (result.success) {
				setMessage("✅ Banner updated successfully");
				setTimeout(() => {
					context.setIsOpenFullScreenPanel({ open: false });
				}, 2000);
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

	const isFormValid = Boolean(formFields.image);

	return (
		<section className="p-2 bg-gray-50">
			<form className="form py-3 p-2" onSubmit={handleSave}>
				<div className="scroll max-h-[72vh] pr-4 overflow-y-scroll ">
					{/* ✅ Banner Image */}
					<div className="px-5">
						<h3 className="font-[700] text-[18px] mb-3">Banner Image</h3>
						<div className="grid grid-cols-7 gap-4">
							{typeof formFields.image === "string" &&
							formFields.image.trim() !== "" ? (
								<div className="uploadBoxWrapper relative">
									<button
										type="button"
										onClick={handleDeleteBannerImg}
										disabled={isLoading}
										className="absolute w-[20px] h-[25px] rounded-full overflow-hidden -top-[5px] -right-[5px] z-50 cursor-pointer"
									>
										<IoMdCloseCircle className=" text-red-700 text-[20px] " />
									</button>
									<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
										<LazyLoadImage
											className="w-full h-full object-cover"
											alt="image"
											src={formFields.image}
											effect="blur"
											wrapperProps={{
												// If you need to, you can tweak the effect transition using the wrapper style.
												style: { transitionDelay: "1s" },
											}}
										/>
									</div>
								</div>
							) : (
								<UploadBox
									multiple={false}
									setImg={
										(url) => setFormFields((prev) => ({ ...prev, image: url }))
										// console.log(url)
									}
									url="/api/banner/upload"
								/>
							)}
						</div>
					</div>
				</div>

				{/* ✅ Message */}
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

				{/* ✅ Submit Button */}
				<div className="w-[250px]">
					<Button
						type="submit"
						className="btn-blue btn-lg w-full gap-2"
						disabled={!isFormValid || isLoading}
					>
						<FaCloudUploadAlt className="text-[20px]" />
						{isLoading ? "Saving..." : "Update Banner"}
					</Button>
				</div>
			</form>
		</section>
	);
}

export default EditBanner;
