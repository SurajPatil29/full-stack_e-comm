import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function HomeCatSlider({ data }) {
	// this slider create for catagory showcase on website
	if (!data || data.length === 0) {
		return (
			<div className="homeCatSlider py-4 pb-8">
				<div className="container">
					<div className="w-full py-10 bg-[#f3f3f3] rounded-[20px] border border-gray-300 flex items-center justify-center">
						<p className="text-gray-500 text-lg font-medium">
							No categories found
						</p>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="homeCatSlider py-4 pb-8 text-black">
			<div className="container">
				<Swiper
					loop={true}
					spaceBetween={12}
					navigation={true}
					modules={[Navigation]}
					breakpoints={{
						// 📱 Mobile
						0: {
							slidesPerView: 2.2,
							spaceBetween: 12,
							navigation: false,
						},

						// 📱 Tablet
						640: {
							slidesPerView: 3.5,
							spaceBetween: 20,
							navigation: false,
						},

						// 💻 Laptop
						1024: {
							slidesPerView: 5,
							spaceBetween: 30,
							navigation: true,
						},

						// 🖥️ Desktop
						1280: {
							slidesPerView: 6,
							spaceBetween: 40,
							navigation: true,
						},
					}}
					className="mySwiper"
				>
					{data?.map((cat, i) => (
						<SwiperSlide key={i}>
							<Link to={`/productListing/cat/${cat?._id}`}>
								<div className="item py-6 px-3 bg-white rounded-[6px] text-center flex items-center justify-center flex-col transition-all duration-300 hover:shadow-lg">
									<img
										src={cat.images[0]}
										alt={cat.name}
										className="w-[48px] 
									sm:w-[56px] 
									transition-transform 
									duration-300 
									group-hover:scale-110"
									/>
									<h3 className="text-[13px] sm:text-[14px] font-[500] mt-3">
										{cat.name}
									</h3>
								</div>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export { HomeCatSlider };
