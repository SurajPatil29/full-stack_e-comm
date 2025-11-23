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
			<h2 className="text-[20px] font-[600] mb-4">From The Blog</h2>
			{loading ? (
				<div className="grid grid-cols-4 gap-6">
					{Array.from({ length: items }).map((_, i) => (
						<BlogItemSkeleton key={i} />
					))}
				</div>
			) : (
				<Swiper
					slidesPerView={items}
					spaceBetween={30}
					loop={data?.length > items}
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
