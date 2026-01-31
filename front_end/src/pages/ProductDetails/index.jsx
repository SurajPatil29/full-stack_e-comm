import {
	Breadcrumbs,
	Button,
	CircularProgress,
	Rating,
	TextField,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ProductZoom from "../../componants/ProductZoom";
import { useContext, useEffect, useRef, useState } from "react";
import ProductsSlider from "../../componants/ProductsSlider";
import ProductDetailsComponant from "../../componants/ProductDetailsComponant";
import {
	deleteDataReview,
	deleteImagefromCloudi,
	fetchDataFromApi,
	postData,
} from "../../utils/api";
import ProductDetailsSkeleton from "../../componants/ProductDetailsComponant/ProductDetailsSkeleton";
import MyContext from "../../context/MyContext";
import { IoMdCloseCircle } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import UploadBox from "../../componants/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ProductDetails() {
	const [activeTab, setActiveTab] = useState(0);
	const [productData, setProductData] = useState({});
	const [reviewsData, setReviewsData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingImg, setIsLoadingImg] = useState(false);
	const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
	const [relatedProdData, setRelatedProdData] = useState([]);

	const reviewSec = useRef();

	const context = useContext(MyContext);
	// console.log(context?.userData);
	const [formFields, setFormFields] = useState({
		rating: 1,
		comment: "",
		userId: "",
		name: "",
		image: "",
	});

	useEffect(() => {
		if (context?.userData?._id) {
			setFormFields((prev) => ({
				...prev,
				userId: context.userData._id,
				name: context.userData.name,
			}));
		}
	}, [context?.userData]);

	const { id } = useParams();

	// Fetch product data
	const loadProduct = () => {
		setIsLoading(true);
		fetchDataFromApi(`/api/product/${id}`).then((res) => {
			if (!res?.error) {
				setProductData(res?.data);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
		});
	};

	const loadReviews = () => {
		fetchDataFromApi(`/api/product/getAllReviews/${id}`).then((res) => {
			if (!res?.error) {
				setReviewsData(res?.reviews);
			}
		});
	};

	useEffect(() => {
		loadProduct();
		loadReviews();
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (!productData?.catId) return;

		const loadRelated = async () => {
			const res = await fetchDataFromApi(
				`/api/product/getAllProductsByCatId/${productData.catId}`,
			);

			// console.log("Related response:", res);

			if (!res?.error) {
				setRelatedProdData(res.products); // <-- FIXED
			}
		};

		loadRelated();
	}, [productData]);

	// ---------------- Delete Image ----------------
	const handleDeleteBannerImg = async () => {
		if (!formFields.image) return;

		try {
			setIsLoadingImg(true);

			await deleteImagefromCloudi("/api/product/deleteImage", formFields.image);

			setFormFields((prev) => ({ ...prev, image: "" }));
		} catch (error) {
			context.openAlertBox("error", "Image delete failed");
		}

		setIsLoadingImg(false);
	};

	const deleteReviews = async () => {
		try {
			const res = await deleteDataReview(
				`/api/product/reviewDelete/${id}`,
				{ userId: formFields.userId }, // must be object
			);

			if (res.success) {
				alert("Review deleted successfully ✔");
				loadReviews();
				loadProduct();
			} else {
				alert("Failed to delete review ❌");
			}
		} catch (error) {
			console.log(error);
			alert("Network error ❌");
		}
	};

	// ---------------- Submit Review ----------------
	const saveReview = async (e) => {
		e.preventDefault();
		setIsLoadingSubmit(true);

		try {
			const result = await postData(`/api/product/addReview/${id}`, formFields);

			if (result.success) {
				context.openAlertBox("success", "Review added successfully");

				// Reset form
				setFormFields((prev) => ({
					...prev,
					comment: "",
					image: "",
					rating: 1,
				}));

				// Refresh product reviews
				loadProduct();
				loadReviews();
			}
		} catch (error) {
			context.openAlertBox("error", "Something went wrong");
		}

		setIsLoadingSubmit(false);
	};

	const gotoReviews = () => {
		window.scrollTo({
			top: reviewSec?.current.offsetTop - 150,
			behavior: "smooth",
		});
		setActiveTab(1);
	};

	const gotoDiscription = () => {
		window.scrollTo({
			top: reviewSec?.current.offsetTop - 150,
			behavior: "smooth",
		});
		setActiveTab(0);
	};

	return (
		<>
			<div className="py-3 sm:py-5">
				<div className="container">
					<Breadcrumbs
						aria-label="breadcrumb"
						className="flex flex-wrap gap-1 text-[12px] sm:text-[14px]"
					>
						<Link
							underline="hover"
							color="inherit"
							href="/"
							className="link transition !text-[14px]"
						>
							Home
						</Link>
						<Link
							underline="hover"
							color="inherit"
							className="link transition !text-[14px]"
						>
							{productData.catName}
						</Link>
						<Link
							underline="hover"
							color="inherit"
							className=" transition !text-[14px]"
						>
							{productData.subCat}
						</Link>
					</Breadcrumbs>
				</div>
			</div>

			<section className="bg-white py-5">
				{isLoading === true ? (
					<ProductDetailsSkeleton />
				) : (
					<div className="container flex flex-col lg:flex-row gap-6 lg:gap-8  ">
						<div className="productZoomContainer w-full lg:w-[40%] ">
							<ProductZoom images={productData.images} />
						</div>

						<div className="productContent w-full lg:w-[60%] px-0 sm:px-6 lg:px-10">
							<ProductDetailsComponant
								item={productData}
								gotoReviews={gotoReviews}
								gotoDiscription={gotoDiscription}
							/>
						</div>
					</div>
				)}

				<div className="container py-10 ">
					<div className="flex flex-wrap items-center gap-4 sm:gap-8">
						<span
							onClick={() => setActiveTab(0)}
							className={`link text-[15px] sm:text-[17px] curser-pointer font-[500] ${
								activeTab === 0 && "text-[#ff5151]"
							} `}
						>
							Description
						</span>

						<span
							onClick={() => setActiveTab(1)}
							className={`link text-[15px] sm:text-[17px] curser-pointer font-[500] ${
								activeTab === 1 && "text-[#ff5151]"
							} `}
							ref={reviewSec}
						>
							Reviews {productData?.numReviews || 0}
						</span>
					</div>

					{activeTab === 0 && (
						<div className="shadow-md w-full lg:w-[80%] py-4 px-4 sm:px-8 rounded-md ">
							<div
								className="description-content text-gray-700 leading-relaxed text-[14px]"
								dangerouslySetInnerHTML={{ __html: productData.description }}
							></div>
						</div>
					)}

					{activeTab === 1 && (
						<div className="shadow-md w-full lg:w-[80%] py-4 px-4 sm:px-8 rounded-md ">
							<div className="w-full productReviewContainer">
								<h2>Customer Questions & Answers</h2>
								<div className="w-full my-4 max-h-[320px] overflow-y-auto space-y-4 pr-2">
									{reviewsData.length === 0 ? (
										<p className="text-center text-gray-500">No reviews yet.</p>
									) : (
										reviewsData.map((rev) => (
											<div
												key={rev._id}
												className="review bg-white rounded-lg shadow-sm border p-4 flex flex-col sm:flex-row gap-4 relative"
											>
												{/* User Avatar */}
												<div className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden border">
													<img
														src={
															rev?.userId?.avatar ||
															"https://cdn-icons-png.flaticon.com/512/149/149071.png"
														}
														alt="user"
														className="w-full h-full object-cover"
													/>
												</div>

												{/* Review Content */}
												<div className="flex-1">
													<div className="flex items-center justify-between top-5">
														<h4 className="text-[15px] font-semibold text-gray-800">
															{rev?.userId?.name}
														</h4>

														<div className="flex items-center justify-end gap-3">
															{/* Rating always fixed at right */}
															<Rating
																name="read-only"
																value={rev.rating}
																size="small"
																readOnly
															/>

															{/* DELETE BUTTON ONLY IF USER OWNS REVIEW */}
															{rev?.userId?._id === context?.userData?._id && (
																<button
																	onClick={deleteReviews}
																	className="text-red-500 hover:text-red-700 transition"
																	title="Delete Review"
																>
																	<FiTrash2 size={18} />
																</button>
															)}
														</div>
													</div>

													<p className="text-gray-500 text-[12px]">
														{new Date(rev.createdAt).toLocaleDateString(
															"en-IN",
														)}
													</p>

													<p className="mt-1 text-gray-700 text-[14px] leading-snug">
														{rev.comment}
													</p>

													{/* Review Image */}
													{Array.isArray(rev.image) && rev.image[0] && (
														<div className="mt-3">
															<div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-2">
																<img
																	src={rev.image[0]}
																	className="w-full h-full object-cover"
																	alt="review"
																/>
															</div>
														</div>
													)}
												</div>
											</div>
										))
									)}
								</div>
								{context.isLogin && (
									<div className="reviewForm bg-white shadow-md p-4 sm:p-6 rounded-xl border">
										<form className="w-full space-y-6" onSubmit={saveReview}>
											{/* Header */}
											<div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
												<h2 className="text-[20px] font-semibold text-gray-800">
													Write a Review
												</h2>

												<div className="flex items-center gap-3">
													<span className="text-[16px] text-gray-700">
														Rating:
													</span>
													<Rating
														name="rating"
														value={formFields.rating}
														precision={1}
														onChange={(_, value) =>
															setFormFields((prev) => ({
																...prev,
																rating: value ?? 1,
															}))
														}
													/>
												</div>
											</div>

											{/* Comment Box */}
											<TextField
												label="Share your experience..."
												multiline
												rows={4}
												fullWidth
												InputProps={{
													style: {
														borderRadius: "10px",
													},
												}}
												value={formFields.comment}
												onChange={(e) =>
													setFormFields((prev) => ({
														...prev,
														comment: e.target.value,
													}))
												}
											/>

											{/* Image Upload */}
											<div>
												<label className="text-gray-700 font-medium">
													Upload Image (optional)
												</label>

												<div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2">
													{formFields.image ? (
														<div className="relative group">
															<button
																type="button"
																onClick={handleDeleteBannerImg}
																disabled={isLoadingImg}
																className="absolute top-1 right-1 bg-white rounded-full shadow p-1 opacity-0 group-hover:opacity-100 transition"
															>
																<IoMdCloseCircle className="text-red-600 text-[22px]" />
															</button>

															<div className="w-full h-[140px] rounded-lg overflow-hidden border">
																<LazyLoadImage
																	className="w-full h-full object-cover"
																	src={formFields.image}
																	alt="uploaded"
																/>
															</div>
														</div>
													) : (
														<UploadBox
															multiple={false}
															setImg={(url) =>
																setFormFields((prev) => ({
																	...prev,
																	image: url,
																}))
															}
															url="/api/product/uploadReviewImages"
														/>
													)}
												</div>
											</div>

											{/* Submit Btn */}
											<div className="pt-2">
												<Button
													type="submit"
													variant="contained"
													disabled={isLoadingSubmit}
													className="!bg-[#ff6b35] hover:!bg-[#e85a28] !text-white !px-6 !py-2 !rounded-lg"
												>
													{isLoadingSubmit ? (
														<CircularProgress size={24} />
													) : (
														"Submit Review"
													)}
												</Button>
											</div>
										</form>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
				<div className="container">
					<h2 className="text-[18px] sm:text-[20px] mb-3">Related Products</h2>
					<ProductsSlider
						items={5}
						data={relatedProdData}
						loading={isLoading}
					/>
				</div>
			</section>
		</>
	);
}

export default ProductDetails;
