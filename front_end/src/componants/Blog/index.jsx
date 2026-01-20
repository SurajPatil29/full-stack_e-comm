import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { BlogItem } from "./BlogItem";
import BlogItemSkeleton from "./BlogItemSkeleton";

function Blog({ items = 4, data = [], loading }) {
	const maxSlidesPerView = 4;

	return (
		<div className="py-4 container ">
			<h2 className="text-[18px] sm:text-[20px] font-[600] mb-4">
				From The Blog
			</h2>
			{loading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{Array.from({ length: items }).map((_, i) => (
						<BlogItemSkeleton key={i} />
					))}
				</div>
			) : (
				<Swiper
					spaceBetween={16}
					loop={data?.length > items}
					breakpoints={{
						// 📱 Mobile
						0: {
							slidesPerView: 1.1,
							spaceBetween: 12,
						},

						// 📱 Tablet
						640: {
							slidesPerView: 2.2,
							spaceBetween: 16,
						},

						// 💻 Desktop
						1024: {
							slidesPerView: items, // 4
							spaceBetween: 30,
						},
					}}
				>
					{data?.map((blog, i) => (
						<SwiperSlide key={i}>
							<BlogItem data={blog} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
}

export default Blog;
