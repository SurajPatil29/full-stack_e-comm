import { Swiper, SwiperSlide } from "swiper/react"; // swiper slider is module use to create sliders

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules"; //moduls from swiper slider use in swiper componant

import "./style.css";

function HomeSlider() {
	return (
		<div className="homeSlider py-4">
			<div className="container">
				<Swiper // swiper sliders main compo this contain banners/ sliders img
					loop={true} //loop of slider
					spaceBetween={20} //space between slider
					centeredSlides={true} //slider in position in center
					navigation={true} // navigation button true
					autoplay={{
						// autoplay slider with given time
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay, Navigation]} //use of  moduls
					className="sliderHome"
				>
					<SwiperSlide>
						{/* this use to place slider details */}
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
