import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import {
	fetchDataFromApi,
	postData,
	deleteImagefromCloudi,
} from "../../utils/api";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";

// ✅ Reusable Input Box (same as AddHomeSliderV2)
const InputBox = ({
	label,
	name,
	value,
	onChange,
	type = "text",
	required,
}) => (
	<div>
		<h3 className="font-[700] text-[18px] mb-1">{label}</h3>
		<input
			type={type}
			name={name}
			value={value || ""}
			required={required}
			onChange={onChange}
			className="w-full h-[40px] border rounded-sm p-3 text-sm"
		/>
	</div>
);

function EditBannerV2() {
	const context = useContext(MyContext);
	const [formFields, setFormFields] = useState({
		images: "",
		title: "",
		price: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const id = context.isOpenFullScreenPanel.id;

	// ---------------------------------------------------
	// 🔥 Fetch EXISTING banner data
	// ---------------------------------------------------
	useEffect(() => {
		if (!id) return;

		const fetchBanner = async () => {
			const res = await fetchDataFromApi(`/api/bannerv2/${id}`);

			if (res?.success && res.data) {
				const banner = res.data;

				setFormFields({
					images: banner.images?.[0] || "",
					title: String(banner.title || ""),
					price: String(banner.price || ""),
				});
			}
		};

		fetchBanner();
	}, [id]);

	// ---------------------------------------------------
	// 🔥 Delete Banner Image (Cloudinary)
	// ---------------------------------------------------
	const handleDeleteBannerImg = async () => {
		if (!formFields.images) return;

		try {
			setIsLoading(true);

			await deleteImagefromCloudi(
				"/api/bannerv2/remove-image",
				formFields.images
			);

			setFormFields((prev) => ({ ...prev, images: "" }));
		} catch (error) {
			console.error(error);
			setMessage("❌ Failed to delete image.");
		} finally {
			setIsLoading(false);
		}
	};

	// ---------------------------------------------------
	// 🔥 Save Updated Banner
	// ---------------------------------------------------
	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");

		if (!formFields.images.trim()) {
			setMessage("❌ Banner image is required");
			return;
		}

		try {
			setIsLoading(true);

			const result = await postData(`/api/bannerv2/${id}`, {
				images: [formFields.images],
				title: formFields.title,
				price: formFields.price,
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
			setMessage("❌ Server error. Try later.");
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid =
		formFields.images.trim() !== "" &&
		formFields.title.trim() !== "" &&
		formFields.price.trim() !== "";

	return (
		<section className="p-2 bg-gray-50">
			<form className="form py-3 p-2" onSubmit={handleSave}>
				<div className="scroll max-h-[72vh] pr-4 overflow-y-scroll">
					{/* TITLE & PRICE */}
					<div className="flex items-center gap-5 m-3">
						<InputBox
							label="Banner Title"
							name="title"
							value={formFields.title}
							onChange={(e) =>
								setFormFields({ ...formFields, title: e.target.value })
							}
							required
						/>

						<InputBox
							label="Price"
							name="price"
							value={formFields.price}
							onChange={(e) =>
								setFormFields({ ...formFields, price: e.target.value })
							}
							required
						/>
					</div>

					{/* IMAGE */}
					<div className="col w-full px-5">
						<h3 className="font-[700] text-[18px] mb-3">Banner Images V2</h3>

						<div className="grid grid-cols-7 gap-4">
							{formFields.images ? (
								<div className="uploadBoxWrapper relative">
									<button
										type="button"
										onClick={handleDeleteBannerImg}
										disabled={isLoading}
										className="absolute w-[20px] h-[25px] rounded-full overflow-hidden -top-[5px] -right-[5px] z-50 cursor-pointer"
									>
										<IoMdCloseCircle className="text-red-700 text-[20px]" />
									</button>

									<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
										<LazyLoadImage
											src={formFields.images}
											alt="banner"
											className="w-full h-full object-cover"
											effect="blur"
										/>
									</div>
								</div>
							) : (
								<UploadBox
									multiple={false}
									setImg={(url) =>
										setFormFields((prev) => ({ ...prev, images: url }))
									}
									url="/api/bannerv2/upload"
								/>
							)}
						</div>
					</div>
				</div>

				{/* MESSAGE */}
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

				{/* SAVE BUTTON */}
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

export default EditBannerV2;
