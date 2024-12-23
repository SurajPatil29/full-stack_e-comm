import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../ProductItem";
function ProductsSlider(props) {
	return (
		<div className="productsSlider py-4 smlBtn">
			<Swiper
				slidesPerView={props.items}
				loop={true}
				spaceBetween={40}
				navigation={true}
				modules={[Navigation]}
				className="mySwiper"
			>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide>
					<ProductItem />
				</SwiperSlide>
			</Swiper>
		</div>
	);
}

ProductsSlider.propTypes = {
	items: PropTypes.number.isRequired,
};

export default ProductsSlider;
