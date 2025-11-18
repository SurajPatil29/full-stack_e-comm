import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Button } from "@mui/material";

function HomeBanner2({ data }) {
	// this home main / top slider is crete using swiper slider this is v2
	// diff is create live / text banner wich contain shop link and text anbout banner
	if (!data || data.length === 0) {
		return (
			<div className="homeSliderV2 py-4">
				<div className="w-full">
					<div
						className="h-[300px] sm:h-[380px] md:h-[420px] 
                    bg-[#f3f3f3] rounded-md border border-gray-300 
                    flex items-center justify-center"
					>
						<p className="text-gray-500 text-lg font-medium">
							No Banners Available
						</p>
					</div>
				</div>
			</div>
		);
	}
	return (
		<Swiper
			loop={true}
			spaceBetween={30}
			effect={"fade"}
			navigation={true}
			pagination={{
				clickable: true,
			}}
			modules={[EffectFade, Navigation, Pagination]}
			className="homeSliderV2 w-full"
		>
			{data?.length > 0 &&
				data.map((item, i) =>
					item.isActive ? (
						<SwiperSlide key={i}>
							<div className="item w-full rounded-md overflow-hidden relative">
								<img src={item.images[0]} />

								<div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all duration-700 ">
									<h4 className="text-[18px] font[500] w-full text-left mb-3 relative -right-[100%] opacity-0 duration-1000 ">
										{" "}
										Big Saving Days Sale
									</h4>
									<h2 className="text-[35px] font-[700] w-full ">
										{item.title}
									</h2>
									<h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 ">
										Starting At Only{" "}
										<span className="text-[#ff5151] text-[30px] font-[700] ">
											₹{item.price}
										</span>
									</h3>
									<div className="w-full text-left">
										<Button className="btn-org ">SHOP NOW</Button>
									</div>
								</div>
							</div>
						</SwiperSlide>
					) : null
				)}
			{/* <SwiperSlide>
				//{" "}
				<div className="item w-full rounded-md overflow-hidden relative">
					//{" "}
					<img src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734950380/sample-1_wu1kn9.jpg" />
					//{" "}
					<div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all duration-700 ">
						//{" "}
						<h4 className="text-[18px] font[500] w-full text-left mb-3 relative -right-[100%] opacity-0 duration-1000 ">
							// // Big Saving Days Sale //{" "}
						</h4>
						//{" "}
						<h2 className="text-[35px] font-[700] w-full ">
							// Women Solid Round Green T-Shirt //{" "}
						</h2>
						//{" "}
						<h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 ">
							// Starting At Only //{" "}
							<span className="text-[#ff5151] text-[30px] font-[700] ">
								// $29.00 //{" "}
							</span>
							//{" "}
						</h3>
						//{" "}
						<div className="w-full text-left">
							// <Button className="btn-org ">SHOP NOW</Button>
							//{" "}
						</div>
						//{" "}
					</div>
					//{" "}
				</div>
				//{" "}
			</SwiperSlide>
			<SwiperSlide>
				//{" "}
				<div className="item w-full rounded-md overflow-hidden">
					//{" "}
					<img src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734950380/sample-2_m9k1kj.jpg" />
					//{" "}
					<div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all duration-700 ">
						//{" "}
						<h4 className="text-[18px] font[500] w-full text-left mb-3 relative -right-[100%] opacity-0 duration-1000 ">
							// // Big Saving Days Sale //{" "}
						</h4>
						//{" "}
						<h2 className="text-[35px] font-[700] w-full ">
							// Buy Modern Chair In Black Color //{" "}
						</h2>
						//{" "}
						<h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 ">
							// Starting At Only //{" "}
							<span className="text-[#ff5151] text-[30px] font-[700] ">
								// $99.00 //{" "}
							</span>
							//{" "}
						</h3>
						//{" "}
						<div className="w-full text-left">
							// <Button className="btn-org ">SHOP NOW</Button>
							//{" "}
						</div>
						//{" "}
					</div>
					//{" "}
				</div>
				//{" "}
			</SwiperSlide> */}
		</Swiper>
	);
}

export default HomeBanner2;
