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
		<div className="flex gap-3">
			<div className="slider w-[15%]">
				<Swiper
					ref={zoomSliderSml}
					direction={"vertical"}
					slidesPerView={5}
					mousewheel={true}
					spaceBetween={10}
					navigation={true}
					modules={[Mousewheel, Navigation]}
					className="zoomProductSliderThumbs h-[500px] overflow-hidden"
				>
					{images.map((img, index) => (
						<SwiperSlide key={index}>
							<div
								onClick={() => goto(index)}
								className={`item rounded-md overflow-hidden cursor-pointer group ${
									sliderIndex === index ? "opacity-100" : "opacity-30"
								}`}
							>
								<img
									className="w-full transition-all group-hover:scale-105"
									src={img}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="w-[85%] h-[500px] overflow-hidden rounded-xl">
				<Swiper ref={zoomSliderBig} slidesPerView={1} spaceBetween={0}>
					{images.map((img, idx) => (
						<SwiperSlide key={idx}>
							<InnerImageZoom zoomType="hover" zoomScale={1} src={img} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default ProductZoom;
