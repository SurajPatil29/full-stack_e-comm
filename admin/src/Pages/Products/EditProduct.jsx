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
	putData,
} from "../../utils/api";
import MyContext from "../../context/MyContext";

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
		<h3 className="text-[14px] font-[500] mb-1">{label}</h3>
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

// ✅ Reusable Select
const SelectBox = ({
	label,
	value,
	onChange,
	options,
	name,
	disabled,
	required,
}) => {
	// Ensure value is in options, else fallback to ""
	const validValues = options?.map((opt) =>
		typeof opt === "string" ? opt : opt._id
	);
	const safeValue = validValues?.includes(value) ? value : "";

	return (
		<div>
			<h3 className="text-[14px] font-[500] mb-1">{label}</h3>
			<Select
				className="w-full bg-white"
				size="small"
				value={safeValue}
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
};

function EditProduct() {
	const context = useContext(MyContext);

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
		productRam: "",
		size: "",
		productWeight: "",
	});

	const [catData, setCatData] = useState([]);
	const [subCatData, setSubCatData] = useState([]);
	const [thirdCatData, setThirdCatData] = useState([]);
	const [deletingImg, setDeletingImg] = useState(null);
	const [loading, setLoading] = useState(false);

	const productId = context?.isOpenFullScreenPanel?.id;

	// ✅ Fetch categories
	const getCategoryData = async () => {
		try {
			const res = await fetchDataFromApi("/api/category/categories");
			setCatData(res.data);
		} catch (error) {
			context.openAlertBox("error", "Failed to fetch categories");
		}
	};

	// ✅ Fetch product details
	const getProductData = async () => {
		try {
			const res = await fetchDataFromApi(`/api/product/${productId}`);
			if (res.success) {
				setFormFields(res.data);
			} else {
				context.openAlertBox("error", res.message || "Failed to load product");
			}
		} catch (error) {
			context.openAlertBox("error", "Error fetching product data");
		}
	};

	// ✅ Populate sub and third categories when product data + categories loaded
	useEffect(() => {
		if (catData.length && formFields.catId) {
			const cat = catData.find((c) => c._id === formFields.catId);
			setSubCatData(cat?.children || []);

			if (formFields.subCatId) {
				const sub = cat?.children?.find((s) => s._id === formFields.subCatId);
				setThirdCatData(sub?.children || []);
			}
		}
	}, [catData, formFields.catId, formFields.subCatId]);

	useEffect(() => {
		(async () => {
			await getCategoryData();
			await getProductData();
		})();
	}, []);

	// ✅ Handle Input Change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormFields((prev) => ({ ...prev, [name]: value }));
	};

	// ✅ Category Change
	const handleChangeProductCat = (e) => {
		const selectedId = e.target.value;
		const selectedCategory = catData.find((cat) => cat._id === selectedId);
		setSubCatData(selectedCategory?.children || []);
		setThirdCatData([]);
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
		const selectedSubCategory = subCatData.find(
			(sub) => sub._id === selectedSubId
		);
		setThirdCatData(selectedSubCategory?.children || []);
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
		const selectedThirdCategory = thirdCatData.find(
			(sub) => sub._id === selectedThirdId
		);
		setFormFields((prev) => ({
			...prev,
			thirdsubCatId: selectedThirdId,
			thirdsubCat: selectedThirdCategory?.name || "",
		}));
	};

	// ✅ Remove Image
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
		} catch {
			context.openAlertBox("error", "Image delete failed");
		} finally {
			setDeletingImg(null);
		}
	};

	// ✅ Submit updated product
	const handleSubmitForm = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await putData(
				`/api/product/updateProduct/${productId}`,
				formFields
			);
			if (res.success) {
				context.openAlertBox("success", "Product updated successfully!");
				setTimeout(() => {
					context?.setIsOpenFullScreenPanel({
						model: "Edit Product",
						open: false,
					}); // 👈 Close the panel
				}, 2000);
			} else {
				context.openAlertBox("error", res.message || "Update failed");
			}
		} catch {
			context.openAlertBox("error", "Something went wrong");
		} finally {
			setLoading(false);
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

					{/* Description */}
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

					{/* Categories */}
					<div className="grid grid-cols-4 gap-4 mb-3">
						<SelectBox
							label="Product Category"
							value={formFields.catId}
							onChange={handleChangeProductCat}
							options={catData}
							required
						/>
						<SelectBox
							label="Sub Category"
							value={formFields.subCatId}
							onChange={handleChangeProductSubCat}
							options={subCatData}
						/>
						<SelectBox
							label="Third Level Category"
							value={formFields.thirdsubCatId}
							onChange={handleChangeProductThirdLevelCat}
							options={thirdCatData}
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

					{/* Price & Details */}
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

					{/* Specs */}
					<div className="grid grid-cols-4 gap-4 mb-3">
						<SelectBox
							label="Product RAM"
							value={formFields.productRam}
							onChange={handleInputChange}
							options={["4GB", "6GB", "8GB"]}
							name="productRam"
						/>
						<SelectBox
							label="Product Weight"
							value={formFields.productWeight}
							onChange={handleInputChange}
							options={["2KG", "4KG", "5KG"]}
							name="productWeight"
						/>
						<SelectBox
							label="Size"
							value={formFields.size}
							onChange={handleInputChange}
							options={["S", "M", "L"]}
							name="size"
						/>
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
							value={formFields.rating || 0}
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
							{formFields.images?.map((img, i) => (
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
					{loading ? "Updating..." : "Update Product"}
				</Button>
			</form>
		</section>
	);
}

export default EditProduct;
