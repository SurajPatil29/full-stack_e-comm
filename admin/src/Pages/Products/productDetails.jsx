import React, { useEffect, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Mousewheel, Navigation } from "swiper/modules";
import { fetchDataFromApi } from "../../utils/api";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function ProductDetails() {
	const [sliderIndex, setSliderIndex] = useState(0);
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const zoomSliderBig = useRef();
	const zoomSliderSml = useRef();
	const { id } = useParams();

	const goto = (index) => {
		setSliderIndex(index);
		zoomSliderSml.current?.swiper?.slideTo(index);
		zoomSliderBig.current?.swiper?.slideTo(index);
	};

	useEffect(() => {
		const getProduct = async () => {
			try {
				setLoading(true);
				const res = await fetchDataFromApi(`/api/product/${id}`);
				setTimeout(() => {
					if (res?.error === false) {
						setProduct(res.data);
					}
					setLoading(false);
				}, 1000);
			} catch (err) {
				console.error("Failed to fetch product:", err);
				setLoading(false);
			}
		};
		getProduct();
	}, [id]);

	const productRams = Array.isArray(product.productRam)
		? product.productRam
		: product.productRam
		? [product.productRam]
		: [];

	if (loading) {
		return (
			<div className="flex items-center justify-center h-[70vh]">
				<CircularProgress color="inherit" />
			</div>
		);
	}

	return (
		<div className="p-4">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-[20px] font-semibold text-gray-800">
					Product Details
				</h2>
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* ✅ IMAGE SECTION */}
				<div className="lg:w-[45%] flex flex-col sm:flex-row gap-4">
					{product.images && product.images.length > 0 ? (
						<>
							{/* Thumbnail Slider */}
							<div className="relative w-[18%] hidden sm:block">
								{/* Top Nav */}
								<div className="swiper-button-prev-sml absolute -top-5 left-1/2 -translate-x-1/2 z-10 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-800 cursor-pointer">
									<i className="fa-solid fa-chevron-up text-xs"></i>
								</div>

								<Swiper
									ref={zoomSliderSml}
									direction="vertical"
									slidesPerView={4}
									mousewheel
									spaceBetween={10}
									navigation={{
										prevEl: ".swiper-button-prev-sml",
										nextEl: ".swiper-button-next-sml",
									}}
									modules={[Mousewheel, Navigation]}
									className="h-[500px] overflow-hidden"
								>
									{product.images.map((img, i) => (
										<SwiperSlide key={i}>
											<div
												onClick={() => goto(i)}
												className={`cursor-pointer rounded-md overflow-hidden border ${
													sliderIndex === i
														? "border-blue-500 opacity-100"
														: "border-gray-200 opacity-40 hover:opacity-80"
												} aspect-square`}
											>
												<img
													src={img}
													alt={`product-thumb-${i}`}
													className="w-full h-full object-cover"
												/>
											</div>
										</SwiperSlide>
									))}
								</Swiper>

								{/* Bottom Nav */}
								<div className="swiper-button-next-sml absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-800 cursor-pointer">
									<i className="fa-solid fa-chevron-down text-xs"></i>
								</div>
							</div>

							{/* Main Image */}
							<div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl h-[500px] overflow-hidden">
								<Swiper ref={zoomSliderBig} slidesPerView={1} spaceBetween={0}>
									{product.images.map((img, i) => (
										<SwiperSlide key={i} className="w-full h-full">
											<div className="w-full h-full relative">
												<InnerImageZoom
													src={img}
													zoomType="hover"
													zoomScale={1.2}
													zoomSrc={img}
													style={{
														width: "100%",
														height: "100%",
														objectFit: "cover", // ensures image fills container
														objectPosition: "center", // center the image
													}}
												/>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</>
					) : (
						<div className="w-full h-[500px] flex items-center justify-center border rounded-xl bg-gray-50">
							<p className="text-gray-500">
								No images uploaded for this product
							</p>
						</div>
					)}
				</div>

				{/* ✅ INFO SECTION */}
				<div className="lg:w-[55%] bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
					{/* Product Title */}
					<div>
						<h1 className="text-3xl font-semibold text-gray-900 mb-1">
							{product?.name || "Unnamed Product"}
						</h1>
						{product?.brand && (
							<p className="text-gray-500 text-sm">
								<span className="font-medium">Brand:</span> {product.brand}
							</p>
						)}
					</div>

					{/* Price Section */}
					<div className="flex items-end gap-3">
						<p className="text-3xl font-bold text-green-600">
							₹{product?.price?.toLocaleString()}
						</p>
						{product?.oldPrice && (
							<p className="text-gray-400 line-through text-lg">
								₹{product.oldPrice.toLocaleString()}
							</p>
						)}
						{product?.discount > 0 && product?.oldPrice && (
							<span className="text-red-500 text-sm font-semibold">
								(
								{Math.round(
									((product.oldPrice - product.price) / product.oldPrice) * 100
								)}
								% OFF)
							</span>
						)}
					</div>

					{/* Description */}
					{product?.description && (
						<div>
							<h3 className="text-lg font-medium mb-1 flex items-center gap-2 text-gray-800">
								<i className="fa-solid fa-circle-info text-blue-500"></i>
								Description
							</h3>
							<p className="text-gray-700 leading-relaxed">
								{product.description}
							</p>
						</div>
					)}

					{/* Category & Type Info */}
					<div className="grid grid-cols-2 gap-y-3 text-[15px] leading-6">
						{product?.catName && (
							<p className="flex items-center">
								<span className="text-gray-900 font-semibold w-[120px]">
									Category:
								</span>
								<span className="text-gray-500 font-medium">
									{product.catName}
								</span>
							</p>
						)}
						{product?.subCat && (
							<p className="flex items-center">
								<span className="text-gray-900 font-semibold w-[120px]">
									Subcategory:
								</span>
								<span className="text-gray-500 font-medium">
									{product.subCat}
								</span>
							</p>
						)}
						{product?.thirdsubCat && (
							<p className="flex items-center">
								<span className="text-gray-900 font-semibold w-[120px]">
									Type:
								</span>
								<span className="text-gray-500 font-medium">
									{product.thirdsubCat}
								</span>
							</p>
						)}
					</div>

					{/* Specifications */}
					<div className="grid grid-cols-2 gap-y-3 text-[15px] leading-6 mt-2">
						{productRams.length > 0 && (
							<p className="flex items-center">
								<span className="text-gray-900 font-semibold w-[120px]">
									RAM:
								</span>
								<span className="text-gray-500 font-medium">
									{productRams.join(", ")}
								</span>
							</p>
						)}
						{product?.size && (
							<p className="flex items-center">
								<span className="text-gray-900 font-semibold w-[120px]">
									Size:
								</span>
								<span className="text-gray-500 font-medium">
									{product.size}
								</span>
							</p>
						)}
						{product?.productWeight && (
							<p className="flex items-center">
								<span className="text-gray-900 font-semibold w-[120px]">
									Weight:
								</span>
								<span className="text-gray-500 font-medium">
									{product.productWeight}
								</span>
							</p>
						)}
					</div>

					{/* Review & Date */}
					<div className="flex items-center gap-8 mt-4 border-t pt-4 text-sm text-gray-600">
						{product?.rating && (
							<div className="flex items-center gap-1">
								<i className="fa-solid fa-star text-yellow-400"></i>
								<span className="font-semibold">{product.rating}</span>
								<span>/5</span>
							</div>
						)}
						{product?.dateCreated && (
							<p>
								<span className="font-medium">Published on:</span>{" "}
								{new Date(product.dateCreated).toLocaleDateString("en-IN", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
