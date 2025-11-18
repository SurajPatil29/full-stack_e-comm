import React from "react";
import UploadBox from "../../Components/UploadBox";
import { IoMdCloseCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; //css for lasyload img
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import { useState } from "react";
import { deleteImagefromCloudi, postData } from "../../utils/api";

// ✅ Reusable Input
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

function AddHomeSliderV2() {
	const context = useContext(MyContext);
	const [formFields, setFormFields] = useState({
		images: "",
		title: "",
		price: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

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
			setMessage("❌ Failed to delete images. Try again.");
			setIsLoading(false);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");
		try {
			setIsLoading(true);
			const result = await postData(`/api/bannerv2/createBanner`, formFields);
			if (result.success) {
				setMessage("✅ Banner added successfully");
				setFormFields({ name: "", images: "" });
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
		}
	};
	const isFormValid = formFields.images;
	return (
		<section className="p-2 bg-gray-50">
			<form className="form py-3 p-2  " onSubmit={handleSave}>
				<div className="scroll max-h-[72vh] pr-4 overflow-y-scroll ">
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
					<div className="col w-full px-5">
						<h3 className="font-[700] text-[18px] mb-3">Banner Images v2</h3>

						<div className="grid grid-cols-7 gap-4 ">
							{formFields.images && formFields.images.trim() !== "" ? (
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
											src={formFields.images}
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
									setImg={(url) =>
										setFormFields((prev) => ({ ...prev, images: url }))
									}
									url="/api/banner/upload"
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
				<br />
				<hr />
				<br />
				<div className="w-[250px] ">
					<Button
						type="submit"
						className="btn-blue btn-lg w-full gap-2"
						disabled={!isFormValid || isLoading}
					>
						<FaCloudUploadAlt className="text-[20px] " />
						{isLoading ? "Saving..." : "Publish & View"}
					</Button>
				</div>
			</form>
		</section>
	);
}

export default AddHomeSliderV2;
