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

			{options?.map((opt) =>
				typeof opt === "string" ? (
					<MenuItem key={opt} value={opt}>
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

function EditBannerBoxV1() {
	const context = useContext(MyContext);
	const id = context.isOpenFullScreenPanel.id;

	// ---------------- Form Fields ----------------
	const [formFields, setFormFields] = useState({
		images: "",
		title: "",
		price: "",
		catId: "",
		subCatId: "",
		thirdsubCatId: "",
		angle: "",
		slide: "",
	});

	// ---------------- Local States ----------------
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const [catData, setCatData] = useState([]);
	const [subCatData, setSubCatData] = useState([]);
	const [thirdCatData, setThirdCatData] = useState([]);
	const [angleData, setAngleData] = useState(["Right", "Left"]); //"Top", "Bottom"
	const [slideData, setSlideData] = useState(["vertical", "horizontal"]);

	// ---------------- Fetch Categories ----------------
	const getCategoryData = async () => {
		try {
			const res = await fetchDataFromApi("/api/category/categories");
			setCatData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	// ---------------- Fetch Existing Banner ----------------
	const fetchBanner = async () => {
		try {
			const res = await fetchDataFromApi(`/api/bannerboxv1/${id}`);

			if (res.success && res.data) {
				const b = res.data;

				setFormFields({
					images: b.images || "",
					title: b.title || "",
					price: String(b.price || ""), // FIXED
					catId: b.catId || "",
					subCatId: b.subCatId || "",
					thirdsubCatId: b.thirdsubCatId || "",
					angle: b.angle || "",
					slide: b.slide || "",
				});

				// Autofill subcategories
				if (b.catId) {
					const selectedCat = catData.find((c) => c._id === b.catId);
					setSubCatData(selectedCat?.children || []);
				}

				// Autofill third-level categories
				if (b.subCatId) {
					const selectedSub = subCatData.find((c) => c._id === b.subCatId);
					setThirdCatData(selectedSub?.children || []);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getCategoryData();
	}, []);

	useEffect(() => {
		if (id && catData.length > 0) fetchBanner();
	}, [id, catData]);

	// ---------------- Handlers ----------------
	const handleChangeProductCat = (e) => {
		const selectedId = e.target.value;

		const selectedCategory = catData.find((cat) => cat._id === selectedId);

		setSubCatData(selectedCategory?.children || []);
		setThirdCatData([]);

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
				"/api/bannerboxv1/remove-image",
				formFields.images
			);
			setFormFields((prev) => ({ ...prev, images: "" }));
		} catch (err) {
			console.log(err);
			setMessage("❌ Failed to delete image.");
		}

		setIsLoading(false);
	};

	// ---------------- UPDATE Banner ----------------
	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");

		try {
			setIsLoading(true);
			const result = await postData(`/api/bannerboxv1/${id}`, formFields);

			if (result.success) {
				setMessage("✅ Banner updated successfully");

				setTimeout(() => {
					context.setIsOpenFullScreenPanel({ open: false });
				}, 1500);
			} else {
				setMessage(result.message || "❌ Something went wrong");
			}
		} catch (err) {
			console.log(err);
			setMessage("❌ Server error.");
		}

		setIsLoading(false);
	};

	// ---------------- Form Validation ----------------
	const isFormValid =
		formFields.images &&
		formFields.title.trim() &&
		formFields.price.trim() &&
		formFields.catId.trim();

	// ========================================================================
	// ------------------------- UI SECTION BELOW ------------------------------
	// ========================================================================

	return (
		<section className="p-2 sm:p-4 bg-gray-50">
			<form className="form py-3 p-2" onSubmit={handleSave}>
				<div className="max-h-[65vh] sm:max-h-[72vh] pr-2 sm:pr-4 overflow-y-auto">
					{/* Inputs */}
					<div className="flex flex-col lg:flex-row lg:items-center gap-4 m-3">
						<InputBox
							label="Banner Title"
							name="title"
							value={formFields.title}
							required
							onChange={(e) =>
								setFormFields({ ...formFields, title: e.target.value })
							}
						/>

						<InputBox
							label="Price"
							name="price"
							value={formFields.price}
							required
							onChange={(e) =>
								setFormFields({ ...formFields, price: e.target.value })
							}
						/>

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
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center gap-4 m-3">
						<SelectBox
							label="Product Angle"
							value={formFields.angle}
							onChange={(e) =>
								setFormFields({ ...formFields, angle: e.target.value })
							}
							options={angleData}
							disabled={!angleData.length}
						/>
						<SelectBox
							label="Product Direction"
							value={formFields.slide}
							onChange={(e) =>
								setFormFields({ ...formFields, slide: e.target.value })
							}
							options={slideData}
							disabled={!slideData.length}
						/>
					</div>

					{/* Image */}
					<div className="col w-full px-5">
						<h3 className="font-[500] text-[18px] mb-3">Banner Image</h3>

						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
							{formFields.images ? (
								<div className="uploadBoxWrapper relative">
									<button
										type="button"
										onClick={handleDeleteBannerImg}
										disabled={isLoading}
										className="absolute w-[20px] h-[25px] rounded-full -top-[5px] -right-[5px] z-50"
									>
										<IoMdCloseCircle className="text-red-700 text-[20px]" />
									</button>

									<div className="uploadBox p-0 Rounded border border-dashed h-[120px] sm:h-[150px] bg-gray-100">
										<LazyLoadImage
											className="w-full h-full object-cover"
											src={formFields.images}
											alt="banner"
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
									url="/api/bannerboxv1/upload"
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

				{/* Save Button */}
				<div className="w-full sm:w-[250px]">
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

export default EditBannerBoxV1;
