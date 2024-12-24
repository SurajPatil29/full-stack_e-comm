import AddBannerSlider from "../../componants/AddBannerSlider";
import { HomeCatSlider } from "../../componants/HomeCatSlider";
// import { HomeSlider } from "../../componants/HomeSlider";
import { FaShippingFast } from "react-icons/fa";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import ProductsSlider from "../../componants/ProductsSlider";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BlogItem } from "../../componants/BlogItem/index";
import HomeBanner2 from "../../componants/HomeSliderV2";
import BannerBoxV2 from "../../componants/BannerBoxV2";

function Home() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<>
			{/* <HomeSlider /> */}
			{/* homeslider v1 */}

			<section className="py-6">
				{/* homeslider v2 */}

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
			</section>

			<HomeCatSlider />
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
								<Tabs
									value={value}
									onChange={handleChange}
									variant="scrollable"
									scrollButtons="auto"
									aria-label="scrollable auto tabs example"
								>
									<Tab label="Fashion" />
									<Tab label="Electronics" />
									<Tab label="Bags" />
									<Tab label="Footwear" />
									<Tab label="Groceries" />
									<Tab label="Beauty" />
									<Tab label="Wellness" />
									<Tab label="Jewellery" />
								</Tabs>
							</Box>
						</div>
					</div>
					<ProductsSlider items={5} />
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

				<AddBannerSlider items={3} />
				{/* ads banner slider */}
			</section>

			<section className="py-5 bg-white">
				<div className="container">
					<h2 className="text-[20px]">Latest Products</h2>
					<ProductsSlider items={5} />
					{/* product slider */}
					<AddBannerSlider items={3} />
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
