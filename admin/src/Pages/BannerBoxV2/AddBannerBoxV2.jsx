import React, { useContext, useEffect, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { IoMdCloseCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button, MenuItem, Select } from "@mui/material";
import MyContext from "../../context/MyContext";
import {
	deleteImagefromCloudi,
	fetchDataFromApi,
	postData,
} from "../../utils/api";

// ---------------- Reusable Input ----------------
const InputBox = ({
	label,
	name,
	value,
	onChange,
	type = "text",
	required,
}) => (
	<div>
		<h3 className="font-[500] text-[18px] mb-1">{label}</h3>
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

// ---------------- Reusable Select ----------------
const SelectBox = ({
	label,
	value,
	onChange,
	options,
	name,
	disabled,
	required,
}) => (
	<div>
		<h3 className="text-[18px] font-[500] mb-1">{label}</h3>
		<Select
			className="w-full bg-white"
			size="small"
			value={value}
			name={name}
			displayEmpty
			onChange={onChange}
			disabled={disabled}
			required={required}
		>
			<MenuItem value="">
				<em>Choose {label}</em>
			</MenuItem>

			{options?.map((opt, i) =>
				typeof opt === "string" ? (
					<MenuItem key={i} value={opt}>
						{opt}
					</MenuItem>
				) : (
					<MenuItem key={opt._id} value={opt._id}>
						{opt.name}
					</MenuItem>
				)
			)}
		</Select>
	</div>
);

function AddBannerBoxV2() {
	const context = useContext(MyContext);

	// ---------------- Form Fields ----------------
	const [formFields, setFormFields] = useState({
		images: "",
		catId: "",
		subCatId: "",
		thirdsubCatId: "",
		prodType: "",
	});

	// ---------------- Local States ----------------
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const [catData, setCatData] = useState([]);
	const [subCatData, setSubCatData] = useState([]);
	const [thirdCatData, setThirdCatData] = useState([]);
	const [prodTypeData, setProdTypeData] = useState(["featured", "latest"]); //"Top", "Bottom"
	// ---------------- Fetch Categories ----------------
	const getCategoryData = async () => {
		try {
			const res = await fetchDataFromApi("/api/category/categories");
			setCatData(res.data);
		} catch (error) {
			console.log(error);
			context.openAlertBox("error", "Failed to fetch categories");
		}
	};

	useEffect(() => {
		getCategoryData();
	}, []);

	// ---------------- Handlers ----------------
	const handleChangeProductCat = (e) => {
		const selectedId = e.target.value;

		const selectedCategory = catData.find((cat) => cat._id === selectedId);

		setSubCatData(selectedCategory?.children || []);
		setThirdCatData([]);

		// Updating form fields
		setFormFields((prev) => ({
			...prev,
			catId: selectedId,
			subCatId: "",
			thirdsubCatId: "",
		}));
	};

	const handleChangeProductSubCat = (e) => {
		const selectedSubId = e.target.value;

		const selectedSubCategory = subCatData.find(
			(sub) => sub._id === selectedSubId
		);

		setThirdCatData(selectedSubCategory?.children || []);

		setFormFields((prev) => ({
			...prev,
			subCatId: selectedSubId,
			thirdsubCatId: "",
		}));
	};

	const handleChangeProductThirdLevelCat = (e) => {
		const selectedThirdId = e.target.value;

		setFormFields((prev) => ({
			...prev,
			thirdsubCatId: selectedThirdId,
		}));
	};

	// ---------------- Delete Image ----------------
	const handleDeleteBannerImg = async () => {
		if (!formFields.images) return;

		try {
			setIsLoading(true);

			await deleteImagefromCloudi(
				"/api/bannerboxv2/remove-image",
				formFields.images
			);

			setFormFields((prev) => ({ ...prev, images: "" }));
		} catch (error) {
			console.error(error);
			setMessage("❌ Failed to delete image.");
		}

		setIsLoading(false);
	};

	// ---------------- Save Banner ----------------
	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");

		try {
			setIsLoading(true);

			const result = await postData(
				"/api/bannerboxv2/createBanner",
				formFields
			);

			if (result.success) {
				setMessage("✅ Banner added successfully");

				setFormFields({
					images: "",
					catId: "",
					subCatId: "",
					thirdsubCatId: "",
					prodType: "",
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
	const isFormValid = formFields.images && formFields.catId.trim();

	// ========================================================================
	// ------------------------- UI SECTION BELOW ------------------------------
	// ========================================================================

	return (
		<section className="p-2 sm:p-4 bg-gray-50">
			<form className="form py-3 p-2" onSubmit={handleSave}>
				<div className="max-h-[65vh] sm:max-h-[72vh] pr-2 sm:pr-4 overflow-y-auto">
					{/* Inputs */}
					<div className="flex flex-col lg:flex-row lg:items-center gap-4 m-3">
						<SelectBox
							label="Product Category"
							value={formFields.catId}
							onChange={handleChangeProductCat}
							options={catData}
							required
						/>

						<SelectBox
							label="Product Sub Category"
							value={formFields.subCatId}
							onChange={handleChangeProductSubCat}
							options={subCatData}
							disabled={!subCatData.length}
						/>

						<SelectBox
							label="Product Third Level Category"
							value={formFields.thirdsubCatId}
							onChange={handleChangeProductThirdLevelCat}
							options={thirdCatData}
							disabled={!thirdCatData.length}
						/>
						<SelectBox
							label="Product Type"
							value={formFields.prodType}
							onChange={(e) =>
								setFormFields({ ...formFields, prodType: e.target.value })
							}
							options={prodTypeData}
							disabled={!prodTypeData.length}
						/>
					</div>

					{/* Image Upload */}
					<div className="col w-full px-5">
						<h3 className="font-[500] text-[18px] mb-3">Banner Image V2</h3>

						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
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

									<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[120px] sm:h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
										<LazyLoadImage
											className="w-full h-full object-cover"
											alt="image"
											src={formFields.images}
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
									url="/api/bannerboxv2/upload"
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

export default AddBannerBoxV2;
