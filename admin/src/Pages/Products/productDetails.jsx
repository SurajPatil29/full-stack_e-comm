import React, { useEffect } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Mousewheel, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";

function ProductDetails() {
	const [sliderIndex, setSliderIndex] = useState(0);
	const zoomSliderBig = useRef();
	const zoomSliderSml = useRef();

	const goto = (index) => {
		setSliderIndex(index);
		zoomSliderSml.current.swiper.slideTo(index);
		zoomSliderBig.current.swiper.slideTo(index);
	};

	const [product, setProduct] = useState({});
	const { id } = useParams();

	useEffect(() => {
		const getProduct = async () => {
			const res = await fetchDataFromApi(`/api/product/${id}`);
			console.log(res);
			if (res?.error === false) {
				setProduct(res.data);
			}
		};

		getProduct();
	}, [id]);

	return (
		<>
			<div className="flex items-center justify-between px-2 py-0 mt-3">
				<h2 className="text-[18px] font-[600] ">Product Details</h2>
			</div>

			<div className="productDetails flex gap-5">
				<div className="w-[40%]">
					{product.images && product.images.length > 0 ? (
						<div className="flex gap-3 ">
							<div className="slider w-[15%]">
								<Swiper
									ref={zoomSliderSml}
									direction={"vertical"}
									slidesPerView={4}
									mousewheel={true}
									spaceBetween={10}
									navigation={true}
									modules={[Mousewheel, Navigation]}
									className="zoomProductSliderThumbs h-[500px] overflow-hidden "
								>
									{product.images.map((img, i) => (
										<SwiperSlide key={i}>
											<div
												onClick={() => goto(i)}
												className={`item rounded-md overflow-hidden cursor-pointer group ${
													sliderIndex === i ? "opacity-100" : "opacity-30"
												}`}
											>
												<img
													className="w-full h-[100px] object-contain bg-gray-50 p-1 transition-all group-hover:scale-105"
													src={img}
													alt={`product-img-${i}`}
												/>
											</div>
										</SwiperSlide>
									))}

									{/* <SwiperSlide>
										<div
											onClick={() => goto(1)}
											className={`item rounded-md overflow-hidden cursor-pointer group ${
												sliderIndex === 1 ? "opacity-1" : "opacity-30"
											}`}
										>
											<img
												className="w-full transition-all group-hover:scale-105"
												src="https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg"
											/>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div
											onClick={() => goto(2)}
											className={`item rounded-md overflow-hidden cursor-pointer group ${
												sliderIndex === 2 ? "opacity-1" : "opacity-30"
											}`}
										>
											<img
												className="w-full transition-all group-hover:scale-105"
												src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
											/>
										</div>
									</SwiperSlide> */}
								</Swiper>
							</div>

							<div className="flex items-center justify-center w-full h-[500px] bg-gray-50 rounded-xl overflow-hidden ">
								<Swiper
									ref={zoomSliderBig}
									slidesPerView={1}
									spaceBetween={0}
									navigation={false}
								>
									{product.images.map((img, i) => (
										<SwiperSlide key={i}>
											<InnerImageZoom
												zoomType="hover"
												zoomScale={1}
												src={img}
												alt={`product-img-${i}`}
												className="max-h-full max-w-full object-contain"
											/>
										</SwiperSlide>
									))}

									{/* <SwiperSlide>
										<InnerImageZoom
											zoomType="hover"
											zoomScale={1}
											src={
												"https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg"
											}
										/>
									</SwiperSlide>

									<SwiperSlide>
										<InnerImageZoom
											zoomType="hover"
											zoomScale={1}
											src={
												"https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
											}
										/>
									</SwiperSlide> */}
								</Swiper>
							</div>
						</div>
					) : (
						<div className="w-full h-[500px] flex items-center justify-center border rounded-xl bg-gray-50">
							<p className="text-gray-500">
								No images uploaded for this product
							</p>
						</div>
					)}
				</div>
				<div className="w-[60%] flex flex-col gap-6 p-6 bg-white rounded-xl shadow-md">
					{/* Product Title & Brand */}
					<div>
						<h1 className="text-3xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
							{product?.name || "Unnamed Product"}
						</h1>
						{product?.brand && (
							<p className="text-gray-500 text-sm flex items-center gap-1">
								<i className="fa-solid fa-tag text-blue-500"></i>
								<span className="font-medium text-gray-600">Brand:</span>
								<span className="text-gray-800">{product.brand}</span>
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
						{product?.discount > 0 && (
							<span className="text-red-500 text-sm font-semibold">
								({Math.round((product.discount / product.oldPrice) * 100)}% OFF)
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

					{/* Category Section */}
					<div className="grid grid-cols-2 gap-y-3 text-sm">
						{product?.catName && (
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-layer-group text-blue-500"></i>
								<span className="text-gray-500 font-medium">Category:</span>
								<span className="text-gray-800 font-semibold">
									{product.catName}
								</span>
							</div>
						)}
						{product?.subCat && (
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-shapes text-green-500"></i>
								<span className="text-gray-500 font-medium">Subcategory:</span>
								<span className="text-gray-800 font-semibold">
									{product.subCat}
								</span>
							</div>
						)}
						{product?.thirdsubCat && (
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-box-open text-yellow-500"></i>
								<span className="text-gray-500 font-medium">Type:</span>
								<span className="text-gray-800 font-semibold">
									{product.thirdsubCat}
								</span>
							</div>
						)}
					</div>

					{/* Specifications Section */}
					<div className="grid grid-cols-2 gap-y-3 text-sm mt-2">
						{product?.productRam && (
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-memory text-purple-500"></i>
								<span className="text-gray-500 font-medium">RAM:</span>
								<span className="text-gray-900 font-semibold">
									{product.productRam}
								</span>
							</div>
						)}
						{product?.size && (
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-ruler-combined text-orange-500"></i>
								<span className="text-gray-500 font-medium">Size:</span>
								<span className="text-gray-900 font-semibold">
									{product.size}
								</span>
							</div>
						)}
						{product?.productWeight && (
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-weight-hanging text-gray-600"></i>
								<span className="text-gray-500 font-medium">Weight:</span>
								<span className="text-gray-900 font-semibold">
									{product.productWeight}
								</span>
							</div>
						)}
						{product?.rating && (
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-star text-yellow-400"></i>
								<span className="text-gray-500 font-medium">Rating:</span>
								<span className="text-gray-900 font-semibold">
									{product.rating} / 5
								</span>
							</div>
						)}
					</div>

					{/* ⭐ Review & Publish Date Section */}
					<div className="flex items-center justify-start gap-8 mt-4 border-t pt-4">
						{/* Review */}
						{product?.rating && (
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-star text-yellow-400 text-lg"></i>
								<span className="text-gray-700 font-semibold">
									{product.rating}
								</span>
								<span className="text-sm text-gray-500">/ 5 Reviews</span>
							</div>
						)}

						{/* Publish Date */}
						{product?.dateCreated && (
							<div className="flex items-center gap-2">
								<i className="fa-regular fa-calendar text-blue-500 text-lg"></i>
								<span className="text-gray-700 font-medium">Published on:</span>
								<span className="text-gray-600 text-sm">
									{new Date(product.dateCreated).toLocaleDateString("en-IN", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Action Button */}
				{/* <div className="mt-6">
						<button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-base font-medium shadow-sm">
							<i className="fa-solid fa-cart-plus"></i>
							Add to Cart
						</button>
					</div> */}
			</div>

			<br />
			<h2 className="text-[18px] font-[500] ">Customer Reviews</h2>

			<div className="reviewsWrap mt-3">
				<div className="reviews w-full h-auto p-4 mb-3 bg-white  rounded-sm shadow-md flex items-center justify-between">
					<div className="flex items-center gap-8">
						<div className="img w-[85px] h-[85px] rounded-full overflow-hidden ">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1756366992/classyshop/classyshopProfile/1756366987380_userImg.jpg"
								alt="userImg"
								className="w-full h-full object-contain "
							/>
						</div>
						<div className="info w-[80%] ">
							<div className="flex items-center justify-between">
								<h4 className="text-[16px] font-[500] ">Naveen Kumar</h4>
								<Rating name="read-only" value={3} readOnly size="small" />
							</div>
							<span className="text-[13px] ">2025-01-08</span>
							<p className="text-[13px] mt-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
								est officia similique natus quibusdam saepe corporis
								consequuntur quisquam quo cum.
							</p>
						</div>
					</div>
				</div>
				<div className="reviews w-full h-auto p-4 mb-3 bg-white  rounded-sm shadow-md flex items-center justify-between">
					<div className="flex items-center gap-8">
						<div className="img w-[85px] h-[85px] rounded-full overflow-hidden ">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1756366992/classyshop/classyshopProfile/1756366987380_userImg.jpg"
								alt="userImg"
								className="w-full h-full object-contain "
							/>
						</div>
						<div className="info w-[80%] ">
							<div className="flex items-center justify-between">
								<h4 className="text-[16px] font-[500] ">Naveen Kumar</h4>
								<Rating name="read-only" value={3} readOnly size="small" />
							</div>
							<span className="text-[13px] ">2025-01-08</span>
							<p className="text-[13px] mt-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
								est officia similique natus quibusdam saepe corporis
								consequuntur quisquam quo cum.
							</p>
						</div>
					</div>
				</div>
				<div className="reviews w-full h-auto p-4 mb-3 bg-white  rounded-sm shadow-md flex items-center justify-between">
					<div className="flex items-center gap-8">
						<div className="img w-[85px] h-[85px] rounded-full overflow-hidden ">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1756366992/classyshop/classyshopProfile/1756366987380_userImg.jpg"
								alt="userImg"
								className="w-full h-full object-contain "
							/>
						</div>
						<div className="info w-[80%] ">
							<div className="flex items-center justify-between">
								<h4 className="text-[16px] font-[500] ">Naveen Kumar</h4>
								<Rating name="read-only" value={3} readOnly size="small" />
							</div>
							<span className="text-[13px] ">2025-01-08</span>
							<p className="text-[13px] mt-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
								est officia similique natus quibusdam saepe corporis
								consequuntur quisquam quo cum.
							</p>
						</div>
					</div>
				</div>
				<div className="reviews w-full h-auto p-4 mb-3 bg-white  rounded-sm shadow-md flex items-center justify-between">
					<div className="flex items-center gap-8">
						<div className="img w-[85px] h-[85px] rounded-full overflow-hidden ">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1756366992/classyshop/classyshopProfile/1756366987380_userImg.jpg"
								alt="userImg"
								className="w-full h-full object-contain "
							/>
						</div>
						<div className="info w-[80%] ">
							<div className="flex items-center justify-between">
								<h4 className="text-[16px] font-[500] ">Naveen Kumar</h4>
								<Rating name="read-only" value={3} readOnly size="small" />
							</div>
							<span className="text-[13px] ">2025-01-08</span>
							<p className="text-[13px] mt-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
								est officia similique natus quibusdam saepe corporis
								consequuntur quisquam quo cum.
							</p>
						</div>
					</div>
				</div>
				<div className="reviews w-full h-auto p-4 mb-3 bg-white  rounded-sm shadow-md flex items-center justify-between">
					<div className="flex items-center gap-8">
						<div className="img w-[85px] h-[85px] rounded-full overflow-hidden ">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1756366992/classyshop/classyshopProfile/1756366987380_userImg.jpg"
								alt="userImg"
								className="w-full h-full object-contain "
							/>
						</div>
						<div className="info w-[80%] ">
							<div className="flex items-center justify-between">
								<h4 className="text-[16px] font-[500] ">Naveen Kumar</h4>
								<Rating name="read-only" value={3} readOnly size="small" />
							</div>
							<span className="text-[13px] ">2025-01-08</span>
							<p className="text-[13px] mt-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
								est officia similique natus quibusdam saepe corporis
								consequuntur quisquam quo cum.
							</p>
						</div>
					</div>
				</div>
				<div className="reviews w-full h-auto p-4 mb-3 bg-white  rounded-sm shadow-md flex items-center justify-between">
					<div className="flex items-center gap-8">
						<div className="img w-[85px] h-[85px] rounded-full overflow-hidden ">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1756366992/classyshop/classyshopProfile/1756366987380_userImg.jpg"
								alt="userImg"
								className="w-full h-full object-contain "
							/>
						</div>
						<div className="info w-[80%] ">
							<div className="flex items-center justify-between">
								<h4 className="text-[16px] font-[500] ">Naveen Kumar</h4>
								<Rating name="read-only" value={3} readOnly size="small" />
							</div>
							<span className="text-[13px] ">2025-01-08</span>
							<p className="text-[13px] mt-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
								est officia similique natus quibusdam saepe corporis
								consequuntur quisquam quo cum.
							</p>
						</div>
					</div>
				</div>
				<div className="reviews w-full h-auto p-4 mb-3 bg-white  rounded-sm shadow-md flex items-center justify-between">
					<div className="flex items-center gap-8">
						<div className="img w-[85px] h-[85px] rounded-full overflow-hidden ">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1756366992/classyshop/classyshopProfile/1756366987380_userImg.jpg"
								alt="userImg"
								className="w-full h-full object-contain "
							/>
						</div>
						<div className="info w-[80%] ">
							<div className="flex items-center justify-between">
								<h4 className="text-[16px] font-[500] ">Naveen Kumar</h4>
								<Rating name="read-only" value={3} readOnly size="small" />
							</div>
							<span className="text-[13px] ">2025-01-08</span>
							<p className="text-[13px] mt-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
								est officia similique natus quibusdam saepe corporis
								consequuntur quisquam quo cum.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductDetails;
