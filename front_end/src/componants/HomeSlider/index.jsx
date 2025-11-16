import { Swiper, SwiperSlide } from "swiper/react"; // swiper slider is module use to create sliders

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules"; //moduls from swiper slider use in swiper componant

import "./style.css";

function HomeSlider({ data }) {
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
					{data?.length !== 0 &&
						data?.map((item, i) => (
							<SwiperSlide key={i}>
								{/* this use to place slider details */}
								<div className="item rounded-[20px] overflow-hidden">
									<img
										src={item.images[0]}
										alt={`banner-${i}`}
										className="w-full"
									/>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
}

export { HomeSlider };
