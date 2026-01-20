import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Mousewheel, Navigation } from "swiper/modules";
import { useRef, useState } from "react";

function ProductZoom({ images = [] }) {
	const [sliderIndex, setSliderIndex] = useState(0);
	const zoomSliderBig = useRef();
	const zoomSliderSml = useRef();

	const goto = (index) => {
		setSliderIndex(index);
		zoomSliderSml.current.swiper.slideTo(index);
		zoomSliderBig.current.swiper.slideTo(index);
	};

	return (
		<div className="flex flex-col sm:flex-row gap-3">
			<div className="w-full sm:w-[10%] order-2 hidden sm:block sm:order-1">
				<Swiper
					ref={zoomSliderSml}
					breakpoints={{
						0: {
							direction: "horizontal",
							slidesPerView: 4,
							navigation: "false",
						},
						640: {
							direction: "vertical",
							slidesPerView: 6,
							navigation: "true",
						},
					}}
					mousewheel={true}
					spaceBetween={10}
					// navigation={true}
					modules={[Mousewheel, Navigation]}
					className="zoomProductSliderThumbs h-[90px] sm:h-[420px] overflow-hidden"
				>
					{images.map((img, index) => (
						<SwiperSlide key={index}>
							<div
								onClick={() => goto(index)}
								className={`item rounded-md overflow-hidden cursor-pointer group ${
									sliderIndex === index ? "opacity-100" : "opacity-60"
								}`}
							>
								<img
									className="w-full h-full object-cover transition group-hover:scale-105"
									src={img}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="w-full sm:w-[90%] h-[300px] sm:h-[420px] lg:h-[500px] overflow-hidden rounded-xl order-1 sm:order-2">
				<Swiper ref={zoomSliderBig} slidesPerView={1} spaceBetween={0}>
					{images.map((img, idx) => (
						<SwiperSlide key={idx}>
							<div className="w-full h-full flex items-center justify-center">
								<InnerImageZoom
									zoomType="hover"
									zoomScale={1.1}
									src={img}
									className="w-full h-full "
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default ProductZoom;
