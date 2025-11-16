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

function Home() {
	const [value, setValue] = useState(null);
	const [homeslideData, setHomeSlidesData] = useState([]);
	const [popularProductsData, setPopularProductsData] = useState([]);
	const [productsData, setProductsData] = useState([]);
	const [FeaturedProductsData, setFeaturedProductsData] = useState([]);

	const context = useContext(MyContext);

	useEffect(() => {
		fetchDataFromApi("/api/banner/all").then((res) => {
			// console.log(res);
			setHomeSlidesData(res.data);
		});
		fetchDataFromApi("/api/product/getAllProducts").then((res) => {
			setProductsData(res.products);
			// console.log(res);
		});
		fetchDataFromApi("/api/product/getAllFeaturedProduct").then((res) => {
			setFeaturedProductsData(res.products);
			// console.log(res);
		});
	}, []);
	useEffect(() => {
		if (context.catData.length > 0) {
			const firstId = context.catData[0]._id;
			setValue(firstId); // Set valid tab value
			filterByCat(firstId); // Load products for first category
		}
	}, [context.catData]);

	const filterByCat = (id) => {
		fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
			if (res.error === false) {
				setPopularProductsData(res?.products);
				// console.log(res.products);
			}
		});
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
		filterByCat(newValue);
	};

	return (
		<>
			{/* homeslider v1 */}
			{homeslideData?.length !== 0 && <HomeSlider data={homeslideData} />}

			{/* homeslider v2 */}
			{/* <section className="py-6">
				

				<div className="container flex items-center">
					<div className="part1 w-[70%]">
						<HomeBanner2 />
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
			</section> */}

			{context?.catData.length !== 0 && (
				<HomeCatSlider data={context.catData} />
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
					{popularProductsData && popularProductsData.length > 0 ? (
						<ProductsSlider items={5} data={popularProductsData} />
					) : (
						<p className="text-center text-gray-500">
							No popular products found
						</p>
					)}
					{/* product slider */}
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
					{productsData?.length !== 0 ? (
						<ProductsSlider items={5} data={productsData} />
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
					{FeaturedProductsData?.length !== 0 ? (
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
