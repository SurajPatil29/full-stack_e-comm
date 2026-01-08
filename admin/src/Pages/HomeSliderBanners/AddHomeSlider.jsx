import React, { useContext, useState, useEffect } from "react";
import UploadBox from "../../Components/UploadBox";
import { IoMdCloseCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import MyContext from "../../context/MyContext";
import {
	deleteImagefromCloudi,
	postData,
	fetchDataFromApi,
} from "../../utils/api";
// ^ make sure this exists

// Input Component
const InputBox = ({
	label,
	name,
	value,
	onChange,
	type = "text",
	required,
	readOnly = false,
}) => (
	<div>
		<h3 className="font-[700] text-[18px] mb-1">{label}</h3>
		<input
			type={type}
			name={name}
			value={value || ""}
			required={required}
			onChange={onChange}
			readOnly={readOnly}
			className={`w-full h-[40px] border rounded-sm p-3 text-sm ${
				readOnly ? "bg-gray-100 cursor-not-allowed" : ""
			}`}
		/>
	</div>
);

function AddHomeSlider() {
	const context = useContext(MyContext);
	const [formFields, setFormFields] = useState({
		images: "",
		productId: context.isOpenFullScreenPanel.id || "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [product, setProduct] = useState({});
	const [allProducts, setAllProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);

	// FIXED USEEFFECT
	useEffect(() => {
		if (formFields.productId) {
			fetchProduct();
		} else {
			fetchAllProducts();
		}
	}, [formFields.productId]);

	const fetchAllProducts = async () => {
		try {
			const res = await fetchDataFromApi("/api/product/getAllProducts");
			if (!res.error) {
				setAllProducts(res.products);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchProduct = async () => {
		try {
			const res = await fetchDataFromApi(
				`/api/product/${formFields.productId}`
			);
			if (res?.error === false) {
				setProduct(res.data);
			}
		} catch (error) {
			console.log(error);
			setMessage("❌ Failed to get product details. Try again.");
		}
	};

	const handleDeleteBannerImg = async () => {
		if (!formFields.images) return;
		try {
			setIsLoading(true);
			await deleteImagefromCloudi(
				"/api/banner/remove-image",
				formFields.images
			);
			setFormFields((prev) => ({ ...prev, images: "" }));
		} catch (error) {
			console.error(error);
			setMessage("❌ Failed to delete images. Try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setMessage("");
		try {
			setIsLoading(true);
			const result = await postData(`/api/banner/createBanner`, formFields);
			if (result.success) {
				setMessage("✅ Banner added successfully");
				setFormFields({ images: "" });
				setTimeout(() => {
					context.setIsOpenFullScreenPanel({ open: false });
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

	const isFormValid = formFields.images;

	return (
		<section className="p-2 sm:p-4 bg-gray-50">
			<form className="form py-3 p-2 max-w-4xl mx-auto" onSubmit={handleSave}>
				<div className="scroll max-h-[65vh] sm:max-h-[72vh] pr-2 sm:pr-4  overflow-y-scroll">
					<div className="col w-full px-5">
						{formFields.productId ? (
							<InputBox label="Product Name" value={product.name} readOnly />
						) : (
							<div className="w-full relative">
								<h3 className="font-[700] text-[18px] mb-1">Select Product</h3>

								<input
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									onFocus={() => setShowDropdown(true)}
									onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
									placeholder="Search product..."
									className="w-full h-[40px] border rounded-sm p-3 text-sm"
								/>

								{/* DROPDOWN LIST */}
								{showDropdown && (
									<div className="absolute left-0 top-full mt-1 w-full max-h-[250px] overflow-y-auto bg-white shadow-lg z-50 border rounded-md">
										{allProducts
											.filter((p) =>
												p.name.toLowerCase().includes(searchTerm.toLowerCase())
											)
											.map((p) => (
												<div
													key={p._id}
													className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
													onClick={() => {
														setFormFields((prev) => ({
															...prev,
															productId: p._id,
														}));
														setProduct(p);
														setShowDropdown(false);
													}}
												>
													<img
														src={p.images?.[0]}
														className="w-[40px] h-[40px] object-cover rounded"
													/>
													<p>{p.name}</p>
												</div>
											))}
									</div>
								)}
							</div>
						)}

						<h3 className="font-[700] text-[18px] mb-3">Banner Images</h3>

						<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
							{formFields.images ? (
								<div className="uploadBoxWrapper relative">
									<button
										type="button"
										onClick={handleDeleteBannerImg}
										disabled={isLoading}
										className="absolute w-[20px] h-[25px] -top-[5px] -right-[5px] z-50"
									>
										<IoMdCloseCircle className="text-red-700 text-[20px]" />
									</button>

									<div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed h-[120px] sm:h-[150px] bg-gray-100 flex items-center justify-center">
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
									url="/api/banner/upload"
								/>
							)}
						</div>
					</div>
				</div>

				{/* Messages */}
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

export default AddHomeSlider;
