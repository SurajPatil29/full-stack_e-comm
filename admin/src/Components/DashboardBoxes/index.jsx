import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
// import navmodule

import { GoGift } from "react-icons/go";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";

function DashboardBoxes() {
	return (
		<>
			<Swiper
				slidesPerView={4}
				spaceBetween={10}
				navigation={true}
				modules={[Navigation]}
				className="dashboardBoxesSlider"
			>
				<SwiperSlide>
					<div className="box p-5 bg-[#2E6BEE] text-white cursor-pointer  rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
						<GoGift className="text-[30px]  " />
						<div className="info w-[70%]">
							<h3>New Orders</h3>
							<b>1,390</b>
						</div>
						<IoStatsChartSharp className="text-[50px] " />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="box p-5 bg-[#00A27D] text-white cursor-pointer  rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
						<AiOutlinePieChart className="text-[40px]   " />
						<div className="info w-[70%]">
							<h3>Sales</h3>
							<b>$57,890</b>
						</div>
						<IoStatsChartSharp className="text-[50px]  " />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="box p-5 bg-[#FF425D] text-white cursor-pointer  rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
						<BsBank className="text-[40px]   " />
						<div className="info w-[70%]">
							<h3>Revenue</h3>
							<b>$12,390</b>
						</div>
						<IoStatsChartSharp className="text-[50px]  " />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="box p-5 bg-[#454CDA] text-white cursor-pointer  rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
						<RiProductHuntLine className="text-[40px]   " />
						<div className="info w-[70%]">
							<h3>Total Products</h3>
							<b>1,390</b>
						</div>
						<IoStatsChartSharp className="text-[50px]  " />
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	);
}

export default DashboardBoxes;
