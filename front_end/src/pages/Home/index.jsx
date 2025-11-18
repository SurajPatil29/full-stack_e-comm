import AddBannerSlider from "../../componants/AddBannerSlider";
import { HomeCatSlider } from "../../componants/HomeCatSlider";
// import { HomeSlider } from "../../componants/HomeSlider";
import { FaShippingFast } from "react-icons/fa";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import ProductsSlider from "../../componants/ProductsSlider";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BlogItem } from "../../componants/BlogItem/index";
import HomeBanner2 from "../../componants/HomeSliderV2";
import BannerBoxV2 from "../../componants/BannerBoxV2";
import AddBannerSliderV2 from "../../componants/AddBannerSliderv2";
import { fetchDataFromApi } from "../../utils/api";
import { HomeSlider } from "../../componants/HomeSlider";
import MyContext from "../../context/MyContext";
import HomeSliderSkeleton from "../../componants/HomeSlider/HomeSliderSkeleton";
import HomeCatSliderSkeleton from "../../componants/HomeCatSlider/HomeCatSliderSkeleton";
import HomeBanner2Skeleton from "../../componants/HomeSliderV2/HomeBanner2Skeleton";

function Home() {
	const [value, setValue] = useState(null);
	const [homeslideData, setHomeSlidesData] = useState([]);
	const [homeslideDataV2, setHomeSlidesDataV2] = useState([]);
	const [popularProductsData, setPopularProductsData] = useState([]);
	const [productsData, setProductsData] = useState([]);
	const [FeaturedProductsData, setFeaturedProductsData] = useState([]);
	const [isLodingProductItem, setIsLoadingProductItem] = useState(false);
	const [isLatestProductLoading, setIsLatestProductLoading] = useState(false);
	const [isBannerLoading, setIsBannerLoading] = useState(false);
	const [isBannerLoadingV2, setIsBannerLoadingV2] = useState(false);
	const [isFeaturedProductLoading, setIsFeaturedProductLoading] =
		useState(false);
	const [isCatLoading, setIsCatLoading] = useState(false);
	const [catData, setCatData] = useState([]);

	const context = useContext(MyContext);

	useEffect(() => {
		if (context?.catData) {
			setIsCatLoading(true);

			// Keep loader for 2 seconds
			setTimeout(() => {
				setCatData(context.catData); // by now context data is loaded correctly
				setIsCatLoading(false);
			}, 2000);
		}
	}, [context.catData]);

	useEffect(() => {
		const loadHomeData = async () => {
			setIsBannerLoading(true);
			setIsBannerLoadingV2(true);
			setIsLatestProductLoading(true);
			setIsFeaturedProductLoading(true);

			try {
				const [bannersRes, bannersV2Res, latestRes, featuredRes] =
					await Promise.all([
						fetchDataFromApi("/api/banner/all"),
						fetchDataFromApi("/api/bannerv2/all"),

						fetchDataFromApi("/api/product/getAllProducts"),
						fetchDataFromApi("/api/product/getAllFeaturedProduct"),
					]);

				// Banners
				if (bannersRes?.error === false) {
					setHomeSlidesData(bannersRes.data);
				} else {
					console.log("Banner API error:", bannersRes?.message);
				}
				setTimeout(() => {
					setIsBannerLoading(false);
				}, 2000);

				// BannersV2
				if (bannersV2Res?.error === false) {
					setHomeSlidesDataV2(bannersV2Res.data);
				} else {
					console.log("Banner API error:", bannersV2Res?.message);
				}
				setTimeout(() => {
					setIsBannerLoadingV2(false);
				}, 2000);

				// LATEST PRODUCTS ----------------
				if (latestRes?.error === false) {
					setProductsData(latestRes.products);
				} else {
					console.log("Latest Product API error:", latestRes?.message);
				}
				setTimeout(() => {
					setIsLatestProductLoading(false);
				}, 2000);

				// FEATURED PRODUCTS --------------
				if (featuredRes?.error === false) {
					setFeaturedProductsData(featuredRes.products);
				} else {
					console.log("Featured Product API error:", featuredRes?.message);
				}
				setTimeout(() => {
					setIsFeaturedProductLoading(false);
				}, 2000);
			} catch (error) {
				console.log("Home Page API error:", error);

				// Stop all loaders even on error
				setTimeout(() => {
					setIsBannerLoading(false);
					setIsLatestProductLoading(false);
					setIsFeaturedProductLoading(false);
				}, 2000);
			}
		};
		loadHomeData();
		// fetchDataFromApi("/api/banner/all").then((res) => {
		// 	// console.log(res);
		// 	setHomeSlidesData(res.data);
		// });
		// fetchDataFromApi("/api/product/getAllProducts").then((res) => {
		// 	setProductsData(res.products);
		// 	// console.log(res);
		// });
		// fetchDataFromApi("/api/product/getAllFeaturedProduct").then((res) => {
		// 	setFeaturedProductsData(res.products);
		// 	// console.log(res);
		// });
	}, []);
	useEffect(() => {
		if (context.catData.length > 0) {
			const firstId = context.catData[0]._id;
			setValue(firstId); // Set valid tab value
			filterByCat(firstId); // Load products for first category
		}
	}, [context.catData]);

	const filterByCat = async (id) => {
		try {
			setIsLoadingProductItem(true);

			const res = await fetchDataFromApi(
				`/api/product/getAllProductsByCatId/${id}`
			);

			if (res?.error === false) {
				setPopularProductsData(res?.products);
			} else {
				setPopularProductsData([]);
				console.log("API error:", res?.message);
			}

			// 🔥 Force loader to stay at least 2 seconds
			setTimeout(() => {
				setIsLoadingProductItem(false);
			}, 2000);
		} catch (error) {
			console.log("API error:", error);
			setPopularProductsData([]);

			// 🔥 Loader still hides after 2 sec even in error
			setTimeout(() => {
				setIsLoadingProductItem(false);
			}, 2000);
		}
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
		filterByCat(newValue);
	};

	return (
		<>
			{/* homeslider v1 */}
			{isBannerLoading ? (
				<HomeSliderSkeleton />
			) : homeslideData?.length > 0 ? (
				<HomeSlider data={homeslideData} />
			) : (
				<HomeSlider data={[]} /> // this will use fallback template
			)}

			{isCatLoading ? (
				<HomeCatSliderSkeleton />
			) : catData?.length > 0 ? (
				<HomeCatSlider data={catData} />
			) : (
				<HomeCatSlider data={[]} /> // fallback template
			)}

			{/* catagory slider */}

			<section className="bg-white py-8">
				{/* catagory product - slider contain catagory and below it products of perticular catagory  */}
				<div className="container ">
					<div className="flex items-center justify-between">
						<div className="leftSec text-black">
							<h2 className="text-[20px] font-[600]">Popular Products</h2>
							<p className="text-[14px] font-[400]">
								Do not miss the current offers util the end of March
							</p>
						</div>

						<div className="rightSec">
							<Box
								sx={{
									maxWidth: { xs: 320, sm: 480 },
									bgcolor: "background.paper",
								}}
							>
								{value && (
									<Tabs
										value={value}
										onChange={handleChange}
										variant="scrollable"
										scrollButtons="auto"
										aria-label="scrollable auto tabs example"
									>
										{context.catData.map((cat) => (
											<Tab key={cat._id} label={cat.name} value={cat._id} />
										))}
									</Tabs>
								)}
							</Box>
						</div>
					</div>
					{isLodingProductItem ? (
						<ProductsSlider items={5} loading={true} />
					) : popularProductsData && popularProductsData.length > 0 ? (
						<ProductsSlider
							items={5}
							data={popularProductsData}
							loading={false}
						/>
					) : (
						<p className="text-center text-gray-500 ">
							No popular products found
						</p>
					)}
					{/* product slider */}
				</div>
			</section>

			{/* homeslider v2 */}
			<section className="py-6">
				<div className="container flex items-center">
					<div className="part1 w-[70%]">
						{isBannerLoadingV2 ? (
							<HomeBanner2Skeleton />
						) : homeslideDataV2?.length > 0 ? (
							<HomeBanner2 data={homeslideDataV2} />
						) : (
							<HomeBanner2 data={[]} /> // this will use fallback template
						)}
					</div>
					<div className="part2 w-[30%] flex items-center justify-between flex-col gap-5">
						<div className="mx-[10%]">
							<BannerBoxV2
								info="left"
								image={
									"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734965948/sub-banner-1_kky0b0.jpg"
								}
							/>
						</div>
						<div className="mx-[10%] ">
							<BannerBoxV2
								info="right"
								image={
									"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734965945/sub-banner-2_sduheq.jpg"
								}
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 p-4 bg-white">
				<div className="container ">
					<div className="freeShiping w-[80%] m-auto p-4 border-[3px] border-[#c33535] flex items-center justify-between rounded-lg">
						{/* Ads div */}
						<div className="col1 flex items-center gap-4">
							<FaShippingFast className="text-[#ff5252] text-[50px]" />
							<h1 className="text-[20px] font-[600] text-black">
								FREE SHIPPING
							</h1>
						</div>

						<div className="col2 ">
							<p className="text-[18px] font-[500] text-black">
								Free Delivery Now On Your First Order and over $200
							</p>
						</div>

						<div className="col3">
							{" "}
							<h1 className="text-[20px] font-[600] text-black">-ONLY $200*</h1>
						</div>
					</div>
				</div>

				<AddBannerSliderV2 items={4} />
				{/* ads banner slider */}
			</section>

			<section className="py-5 bg-white">
				<div className="container">
					<h2 className="text-[20px]">Latest Products</h2>
					{isLatestProductLoading ? (
						<ProductsSlider items={5} loading={true} />
					) : productsData?.length !== 0 ? (
						<ProductsSlider items={5} data={productsData} loading={false} />
					) : (
						<div className="w-full h-[200px] flex items-center justify-center ">
							<p className="text-[rgba(0,0,0,0.7)]  ">
								No Latest Products Found!
							</p>
						</div>
					)}
					{/* product slider */}
					<AddBannerSlider items={3} />
					{/* Ads slider */}
				</div>
			</section>

			<section className="py-5 pt-0 bg-white">
				<div className="container">
					<h2 className="text-[20px] font-[600] ">Featured Products</h2>
					{isFeaturedProductLoading ? (
						<ProductsSlider items={6} loading={true} />
					) : FeaturedProductsData?.length !== 0 ? (
						<ProductsSlider items={6} data={FeaturedProductsData} />
					) : (
						<div className="w-full h-[200px] flex items-center justify-center ">
							<p className="text-[rgba(0,0,0,0.7)]  ">
								No Latest Products Found!
							</p>
						</div>
					)}
					{/* product slider */}
					<AddBannerSlider items={4} />
					{/* Ads slider */}
				</div>
			</section>

			<section className="py-4 pt-0 pb-8  bg-white blogSection ">
				{/* Blog slider */}
				<div className="py-4 container ">
					<h2 className="text-[20px] font-[600] mb-4">From The Blog</h2>
					<Swiper
						loop={true}
						slidesPerView={4}
						// rewind={true}
						spaceBetween={40}
						navigation={true}
						modules={[Navigation]}
						className="smlBtn"
					>
						<SwiperSlide>
							<BlogItem />
						</SwiperSlide>
						<SwiperSlide>
							<BlogItem />
						</SwiperSlide>
						<SwiperSlide>
							<BlogItem />
						</SwiperSlide>
						<SwiperSlide>
							<BlogItem />
						</SwiperSlide>
						<SwiperSlide>
							<BlogItem />
						</SwiperSlide>
						<SwiperSlide>
							<BlogItem />
						</SwiperSlide>
						<SwiperSlide>
							<BlogItem />
						</SwiperSlide>
					</Swiper>
				</div>
			</section>
		</>
	);
}

export { Home };
