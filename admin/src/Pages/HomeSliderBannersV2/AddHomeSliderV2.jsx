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
import {
	deleteImagefromCloudi,
	fetchDataFromApi,
	postData,
} from "../../utils/api";
import { useEffect } from "react";

// ✅ Reusable Input
const InputBox = ({
	label,
	name,
	value,
	onChange,
	type = "text",
	required,
	readOnly = false, // ADD THIS
}) => (
	<div>
		<h3 className="font-[700] text-[18px] mb-1">{label}</h3>
		<input
			type={type}
			name={name}
			value={value || ""}
			required={required}
			onChange={onChange}
			readOnly={readOnly} // AND THIS
			className={`w-full h-[40px] border rounded-sm p-3 text-sm ${
				readOnly ? "bg-gray-100 cursor-not-allowed" : ""
			}`}
		/>
	</div>
);

function AddHomeSliderV2() {
	const context = useContext(MyContext);
	const [formFields, setFormFields] = useState({
		images: "",
		title: "",
		price: "",
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
			console.log(res);
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
				setFormFields({
					images: "",
					title: "",
					price: "",
					productId: "",
				});
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
									<div className="absolute left-0 top-[75px] w-full max-h-[250px] overflow-y-auto bg-white shadow-lg z-50 border rounded-md">
										{allProducts
											?.filter((p) =>
												p?.name
													?.toLowerCase()
													.includes(searchTerm.toLowerCase())
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
									url="/api/bannerv2/upload"
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
