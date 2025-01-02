import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Mousewheel, Navigation } from "swiper/modules";
import { useRef, useState } from "react";

function ProductZoom() {
	const [sliderIndex, setSliderIndex] = useState(0);
	const zoomSliderBig = useRef();
	const zoomSliderSml = useRef();

	const goto = (index) => {
		setSliderIndex(index);
		zoomSliderSml.current.swiper.slideTo(index);
		zoomSliderBig.current.swiper.slideTo(index);
	};

	return (
		<>
			<div className="flex gap-3 ">
				<div className="slider w-[15%]">
					<Swiper
						ref={zoomSliderSml}
						direction={"vertical"}
						slidesPerView={4}
						mousewheel={true}
						spaceBetween={10}
						navigation={true}
						modules={[Mousewheel, Navigation]}
						className="zoomProductSliderThumbs h-[74vh] overflow-hidden "
					>
						<SwiperSlide>
							<div
								onClick={() => goto(0)}
								className={`item rounded-md overflow-hidden cursor-pointer group ${
									sliderIndex === 0 ? "opacity-1" : "opacity-30"
								}`}
							>
								<img
									className="w-full transition-all group-hover:scale-105"
									src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
								/>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div
								onClick={() => goto(1)}
								className={`item rounded-md overflow-hidden cursor-pointer group ${
									sliderIndex === 1 ? "opacity-1" : "opacity-30"
								}`}
							>
								<img
									className="w-full transition-all group-hover:scale-105"
									src="https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg"
								/>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div
								onClick={() => goto(2)}
								className={`item rounded-md overflow-hidden cursor-pointer group ${
									sliderIndex === 2 ? "opacity-1" : "opacity-30"
								}`}
							>
								<img
									className="w-full transition-all group-hover:scale-105"
									src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
								/>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>

				<div className="w-[85%] h-[75vh] overflow-hidden ">
					<Swiper
						ref={zoomSliderBig}
						slidesPerView={1}
						spaceBetween={0}
						navigation={false}
					>
						<SwiperSlide>
							<InnerImageZoom
								zoomType="hover"
								zoomScale={1}
								src={
									"https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
								}
							/>
						</SwiperSlide>
						<SwiperSlide>
							<InnerImageZoom
								zoomType="hover"
								zoomScale={1}
								src={
									"https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg"
								}
							/>
						</SwiperSlide>

						<SwiperSlide>
							<InnerImageZoom
								zoomType="hover"
								zoomScale={1}
								src={
									"https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
								}
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</>
	);
}

export default ProductZoom;
