import { Button, MenuItem, Select, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
	deleteImagefromCloudi,
	fetchDataFromApi,
	postData,
} from "../../utils/api";
import MyContext from "../../context/MyContext";

// Reusable Input
const InputBox = ({
	label,
	name,
	value,
	onChange,
	type = "text",
	required,
}) => (
	<div>
		<h3 className="text-[14px] font-[500] mb-1">{label}</h3>
		<input
			type={type}
			name={name}
			value={value}
			required={required}
			onChange={onChange}
			className="w-full h-[40px] border rounded-sm p-3 text-sm"
		/>
	</div>
);

// Reusable Select
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
		<h3 className="text-[14px] font-[500] mb-1">{label}</h3>
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

function AddProduct() {
	const [formFields, setFormFields] = useState({
		name: "",
		description: "",
		images: [],
		brand: "",
		price: "",
		oldPrice: "",
		catName: "",
		catId: "",
		subCat: "",
		subCatId: "",
		thirdsubCatId: "",
		thirdsubCat: "",
		countInStock: "",
		rating: 0,
		isFeatured: false,
		discount: "",
		productRam: [],
		size: [],
		productWeight: [],
	});

	const [loading, setLoading] = useState(false); // for form submit
	const [deletingImg, setDeletingImg] = useState(null); // for individual image delete
	const context = useContext(MyContext);

	// Categories
	const [catData, setCatData] = useState([]);
	const [subCatData, setSubCatData] = useState([]);
	const [thirdCatData, setThirdCatData] = useState([]);

	const [productCat, setProductCat] = useState("");
	const [productSubCat, setProductSubCat] = useState("");
	const [productThirdLevelCat, setProductThirdLevelCat] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormFields((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const getCategoryData = async () => {
		try {
			const res = await fetchDataFromApi("/api/category/categories");
			setCatData(res.data);
		} catch (error) {
			context.openAlertBox("error", "Failed to fetch categories");
		}
	};

	useEffect(() => {
		getCategoryData();
	}, []);

	const handleChangeProductCat = (e) => {
		const selectedId = e.target.value;
		setProductCat(selectedId);

		const selectedCategory = catData.find((cat) => cat._id === selectedId);

		setSubCatData(selectedCategory?.children || []);
		setProductSubCat("");
		setThirdCatData([]);
		setProductThirdLevelCat("");
		// console.log(selectedCategory?.name, selectedId);

		setFormFields((prev) => ({
			...prev,
			catName: selectedCategory?.name || "",
			catId: selectedId,
			subCat: "",
			subCatId: "",
			thirdsubCat: "",
			thirdsubCatId: "",
		}));
	};

	const handleChangeProductSubCat = (e) => {
		const selectedSubId = e.target.value;
		setProductSubCat(selectedSubId);

		const selectedSubCategory = subCatData.find(
			(sub) => sub._id === selectedSubId
		);

		setThirdCatData(selectedSubCategory?.children || []);
		setProductThirdLevelCat("");
		// console.log(selectedSubCategory?.name, selectedSubId);

		setFormFields((prev) => ({
			...prev,
			subCat: selectedSubCategory?.name || "",
			subCatId: selectedSubId,
			thirdsubCat: "",
			thirdsubCatId: "",
		}));
	};

	const handleChangeProductThirdLevelCat = (e) => {
		const selectedThirdId = e.target.value;
		setProductThirdLevelCat(selectedThirdId);

		const selectedThirdCategory = thirdCatData.find(
			(sub) => sub._id === selectedThirdId
		);
		// console.log(selectedThirdId, selectedThirdCategory?.name);

		setFormFields((prev) => ({
			...prev,
			thirdsubCatId: selectedThirdId,
			thirdsubCat: selectedThirdCategory?.name || "",
		}));
	};

	// Submit
	const handleSubmitForm = async (e) => {
		e.preventDefault();

		// ✅ Field validations
		if (!formFields.name.trim()) {
			context.openAlertBox("error", "Please enter product name");
			return;
		}
		if (!formFields.description.trim()) {
			context.openAlertBox("error", "Please enter product description");
			return;
		}
		if (
			!formFields.price ||
			isNaN(formFields.price) ||
			Number(formFields.price) <= 0
		) {
			context.openAlertBox("error", "Please enter a valid price");
			return;
		}
		if (
			formFields.oldPrice &&
			(isNaN(formFields.oldPrice) || Number(formFields.oldPrice) <= 0)
		) {
			context.openAlertBox("error", "Old price must be a positive number");
			return;
		}
		if (!formFields.catId) {
			context.openAlertBox("error", "Please select a category");
			return;
		}

		if (
			!formFields.countInStock ||
			isNaN(formFields.countInStock) ||
			Number(formFields.countInStock) < 0
		) {
			context.openAlertBox("error", "Please enter valid stock count");
			return;
		}
		if (
			formFields.discount &&
			(isNaN(formFields.discount) || Number(formFields.discount) < 0)
		) {
			context.openAlertBox("error", "Discount must be a valid number");
			return;
		}
		if (
			formFields.rating &&
			(isNaN(formFields.rating) ||
				Number(formFields.rating) < 0 ||
				Number(formFields.rating) > 5)
		) {
			context.openAlertBox("error", "Rating must be between 0 and 5");
			return;
		}
		if (!formFields.images || formFields.images.length === 0) {
			context.openAlertBox("error", "Please upload at least one product image");
			return;
		}

		// ✅ Passed validation -> send data
		setLoading(true);
		try {
			const res = await postData("/api/product/create", formFields);

			if (res.error) {
				context.openAlertBox(
					"error",
					res.message || "Failed to create product"
				);
			} else {
				context.openAlertBox("success", "Product created successfully!");
				// Reset form
				setFormFields({
					name: "",
					description: "",
					images: [],
					brand: "",
					price: "",
					oldPrice: "",
					catName: "",
					catId: "",
					subCat: "",
					subCatId: "",
					thirdsubCatId: "",
					thirdsubCat: "",
					countInStock: "",
					rating: 0,
					isFeatured: false,
					discount: "",
					productRam: "",
					size: "",
					productWeight: "",
				});
			}
		} catch (error) {
			context.openAlertBox("error", "Something went wrong. Try again.");
		} finally {
			setLoading(false);
		}
	};

	// Handle Image Remove
	const handleRemoveImage = async (img) => {
		setDeletingImg(img);
		try {
			const res = await deleteImagefromCloudi(`/api/product/deleteImage`, img);

			if (res.error) {
				context.openAlertBox("error", res.message || "Failed to delete image");
			} else {
				setFormFields((prev) => ({
					...prev,
					images: prev.images.filter((i) => i !== img),
				}));
				context.openAlertBox("success", "Image deleted successfully");
			}
		} catch (err) {
			context.openAlertBox("error", "Image delete failed");
		} finally {
			setDeletingImg(null);
		}
	};

	return (
		<section className="p-5 bg-gray-50">
			<form className="form py-3 p-8" onSubmit={handleSubmitForm}>
				<div className="scroll max-h-[72vh] pr-4 overflow-y-scroll">
					{/* Product Name */}
					<InputBox
						label="Product Name"
						name="name"
						value={formFields.name}
						onChange={handleInputChange}
						required
					/>

					{/* Product Description */}
					<div className="mb-3">
						<h3 className="text-[14px] font-[500] mb-1">Product Description</h3>
						<textarea
							className="w-full h-[100px] border rounded-sm p-3 text-sm"
							name="description"
							value={formFields.description}
							onChange={handleInputChange}
							required
						/>
					</div>

					{/* Category Selects */}
					<div className="grid grid-cols-4 gap-4 mb-3">
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
						<div>
							<h3 className="text-[14px] font-[500] mb-1">Is Featured?</h3>
							<Select
								size="small"
								value={formFields.isFeatured ? "true" : "false"}
								onChange={(e) =>
									setFormFields((prev) => ({
										...prev,
										isFeatured: e.target.value === "true",
									}))
								}
								className="w-full bg-white"
							>
								<MenuItem value="true">True</MenuItem>
								<MenuItem value="false">False</MenuItem>
							</Select>
						</div>
					</div>

					{/* Price, Brand, Discount */}
					<div className="grid grid-cols-4 gap-4 mb-3">
						<InputBox
							label="Product Price"
							name="price"
							value={formFields.price}
							onChange={handleInputChange}
							required
						/>
						<InputBox
							label="Old Price"
							name="oldPrice"
							value={formFields.oldPrice}
							onChange={handleInputChange}
						/>
						<InputBox
							label="Brand"
							name="brand"
							value={formFields.brand}
							onChange={handleInputChange}
						/>
						<InputBox
							label="Discount"
							name="discount"
							value={formFields.discount}
							onChange={handleInputChange}
						/>
					</div>

					{/* RAM, Weight, Size, Stock */}
					<div className="grid grid-cols-4 gap-4 mb-3">
						<div>
							<h3 className="text-[14px] font-[500] mb-1">Product RAM</h3>
							<Select
								multiple
								size="small"
								name="productRam"
								value={formFields.productRam}
								onChange={(e) =>
									setFormFields((prev) => ({
										...prev,
										productRam: e.target.value,
									}))
								}
								className="w-full bg-white"
								renderValue={(selected) => selected.join(", ")}
							>
								{["4GB", "6GB", "8GB", "12GB", "16GB"].map((opt) => (
									<MenuItem key={opt} value={opt}>
										{opt}
									</MenuItem>
								))}
							</Select>
						</div>

						<div>
							<h3 className="text-[14px] font-[500] mb-1">Product Weight</h3>
							<Select
								multiple
								size="small"
								name="productWeight"
								value={formFields.productWeight}
								onChange={(e) =>
									setFormFields((prev) => ({
										...prev,
										productWeight: e.target.value,
									}))
								}
								className="w-full bg-white"
								renderValue={(selected) => selected.join(", ")}
							>
								{["1KG", "2KG", "3KG", "4KG", "5KG"].map((opt) => (
									<MenuItem key={opt} value={opt}>
										{opt}
									</MenuItem>
								))}
							</Select>
						</div>

						<div>
							<h3 className="text-[14px] font-[500] mb-1">Product Size</h3>
							<Select
								multiple
								size="small"
								name="size"
								value={formFields.size}
								onChange={(e) =>
									setFormFields((prev) => ({
										...prev,
										size: e.target.value,
									}))
								}
								className="w-full bg-white"
								renderValue={(selected) => selected.join(", ")}
							>
								{["S", "M", "L", "XL", "XXL"].map((opt) => (
									<MenuItem key={opt} value={opt}>
										{opt}
									</MenuItem>
								))}
							</Select>
						</div>

						<InputBox
							label="Stock"
							name="countInStock"
							value={formFields.countInStock}
							onChange={handleInputChange}
							type="number"
						/>
					</div>

					{/* Rating */}
					<div className="mb-3">
						<h3 className="text-[14px] font-[500] mb-1">Rating</h3>
						<Rating
							name="rating"
							value={formFields.rating}
							onChange={(_, value) =>
								setFormFields((prev) => ({ ...prev, rating: value }))
							}
							precision={0.5}
						/>
					</div>

					{/* Images */}
					<div className="p-5">
						<h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>
						<div className="grid grid-cols-7 gap-4">
							{formFields.images.map((img, i) => (
								<div key={i} className="relative">
									{deletingImg === img ? (
										<div className="absolute inset-0 flex justify-center items-center bg-white/70 rounded">
											<CircularProgress size={28} />
										</div>
									) : (
										<IoMdCloseCircle
											className="absolute top-[-5px] right-[-5px] text-red-700 cursor-pointer z-50"
											onClick={() => handleRemoveImage(img)}
										/>
									)}
									<LazyLoadImage
										className="w-full h-[150px] object-cover rounded"
										src={img}
										effect="blur"
									/>
								</div>
							))}
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
								url="/api/product/uploadImages"
							/>
						</div>
					</div>
				</div>
				<hr className="my-4" />
				<Button
					type="submit"
					className="btn-blue w-full gap-2"
					disabled={loading}
				>
					{loading ? (
						<CircularProgress size={20} color="inherit" />
					) : (
						<FaCloudUploadAlt className="text-[20px]" />
					)}
					{loading ? "Publishing..." : "Publish & View"}
				</Button>
			</form>
		</section>
	);
}

export default AddProduct;
