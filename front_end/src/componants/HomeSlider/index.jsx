import { Swiper, SwiperSlide } from "swiper/react"; // swiper slider is module use to create sliders

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules"; //moduls from swiper slider use in swiper componant

import "./style.css";
import { Link } from "react-router-dom";

function HomeSlider({ data }) {
	if (!data || data.length === 0) {
		// Show fallback template if no banners
		return (
			<div className="homeSlider py-4">
				<div className="container">
					<div className="h-[300px] sm:h-[380px] md:h-[420px] bg-[#f3f3f3] rounded-[20px] border border-gray-300 flex items-center justify-center">
						<p className="text-gray-500 text-lg font-medium">
							No Banners Available
						</p>
					</div>
				</div>
			</div>
		);
	}
	// console.log(data);
	return (
		<div className="homeSlider py-4">
			<div className="container">
				<Swiper // swiper sliders main compo this contain banners/ sliders img
					loop={true} //loop of slider
					spaceBetween={16} //space between slider
					centeredSlides={true} //slider in position in center
					autoplay={{
						// autoplay slider with given time
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay, Navigation]} //use of  moduls
					navigation={false} // default OFF (mobile first)
					breakpoints={{
						// 📱 Mobile
						0: {
							slidesPerView: 1,
							navigation: false,
						},

						// 📱 Tablet
						640: {
							slidesPerView: 1,
							navigation: false,
						},

						// 💻 Desktop
						1024: {
							slidesPerView: 1,
							navigation: true, // show buttons only on desktop
						},
					}}
					className="sliderHome"
				>
					{data?.length > 0 &&
						data.map((item, i) =>
							item.isActive ? (
								<SwiperSlide key={i}>
									<div className="item rounded-[6px] overflow-hidden">
										<Link
											to={`/productDetails/${item?.productId}`}
											className="pointer-events-auto"
										>
											<img
												src={item.images[0]}
												alt={`banner-${i}`}
												className="
										w-full 
										h-[160px] 
										sm:h-[220px] 
										md:h-[280px] 
										lg:h-[360px] 
										object-cover
									"
											/>
										</Link>
									</div>
								</SwiperSlide>
							) : null,
						)}
				</Swiper>
			</div>
		</div>
	);
}

export { HomeSlider };
