import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./index.css";

import { Navigation, Scrollbar } from "swiper/modules";
// import navmodule

import { GoGift } from "react-icons/go";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";

function DashboardBoxes() {
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalOrders, setTotalOrders] = useState(0);
	const [totalProducts, setTotalProducts] = useState(0);
	const [totalCategories, setTotalCategories] = useState(0);

	useEffect(() => {
		let isMounted = true; // prevent state update after unmount

		const fetchDashboardCounts = async () => {
			try {
				const [users, orders, products, categories] = await Promise.all([
					fetchDataFromApi("/api/user/userCount"),
					fetchDataFromApi("/api/order/all-order-list"),
					fetchDataFromApi("/api/product/getAllProducts"),
					fetchDataFromApi("/api/category/get/count"),
				]);

				if (!isMounted) return;

				setTotalUsers(users?.count || 0);
				setTotalOrders(orders?.orders?.length || 0);
				setTotalProducts(products?.products?.length || 0);
				setTotalCategories(categories?.categoryCount || 0);
			} catch (error) {
				console.error("Dashboard fetch error:", error);
			}
		};

		fetchDashboardCounts();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<>
			<Swiper
				slidesPerView={4}
				spaceBetween={10}
				navigation={true}
				scrollbar={{
					draggable: true, // 👈 enable drag
					hide: false, // 👈 always visible (optional)
				}}
				grabCursor={true} // 👈 mouse drag on desktop
				allowTouchMove={true}
				modules={[Navigation, Scrollbar]}
				className="dashboardBoxesSlider"
				breakpoints={{
					0: {
						slidesPerView: 1, // below 480px
					},
					480: {
						slidesPerView: 2, // 480px – 719px
					},
					720: {
						slidesPerView: 2, // keep 2 till 1080
					},
					1080: {
						slidesPerView: 3, // 720px – 1079px
					},
					1280: {
						slidesPerView: 4, // desktop
					},
				}}
			>
				<SwiperSlide>
					<div className="box p-5 bg-[#00A27D] text-white cursor-pointer  rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
						<AiOutlinePieChart className="text-[40px]   " />
						<div className="info w-[70%]">
							<h3>Total Users</h3>
							<b>{totalUsers}</b>
						</div>
						<IoStatsChartSharp className="text-[50px]  " />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="box p-5 bg-[#2E6BEE] text-white cursor-pointer  rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
						<GoGift className="text-[30px]  " />
						<div className="info w-[70%]">
							<h3>Total Orders</h3>
							<b>{totalOrders}</b>
						</div>
						<IoStatsChartSharp className="text-[50px] " />
					</div>
				</SwiperSlide>

				<SwiperSlide>
					<div className="box p-5 bg-[#FF425D] text-white cursor-pointer  rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
						<BsBank className="text-[40px]   " />
						<div className="info w-[70%]">
							<h3>Total Products</h3>
							<b>{totalProducts}</b>
						</div>
						<IoStatsChartSharp className="text-[50px]  " />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="box p-5 bg-[#454CDA] text-white cursor-pointer  rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
						<RiProductHuntLine className="text-[40px]   " />
						<div className="info w-[70%]">
							<h3>Total Categories</h3>
							<b>{totalCategories}</b>
						</div>
						<IoStatsChartSharp className="text-[50px]  " />
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	);
}

export default DashboardBoxes;
