import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

import "./style.css";

function HomeSlider() {
	return (
		<div className="homeSlider py-4">
			<div className="container">
				<Swiper
					loop={true}
					spaceBetween={20}
					centeredSlides={true}
					navigation={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay, Navigation]}
					className="sliderHome"
				>
					<SwiperSlide>
						<div className="item rounded-[20px] overflow-hidden">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734581212/s5_wjefxg.jpg"
								alt="s2"
								className="w-full"
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="item rounded-[20px] overflow-hidden">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734581213/s6_coktvw.jpg"
								alt="s1"
								className="w-full"
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="item rounded-[20px] overflow-hidden">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734581210/s3_rnbruc.jpg"
								alt="s3"
								className="w-full"
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="item rounded-[20px] overflow-hidden">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734581209/s1_dywytc.jpg"
								alt="s4"
								className="w-full"
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="item rounded-[20px] overflow-hidden">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734581211/s7_ioieeu.jpg"
								alt="s5"
								className="w-full"
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="item rounded-[20px] overflow-hidden">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734581209/s4_k0awzz.jpg"
								alt="s6"
								className="w-full"
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="item rounded-[20px] overflow-hidden">
							<img
								src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734581210/s2_rlnnvm.jpg"
								alt="s7"
								className="w-full"
							/>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
}

export { HomeSlider };
