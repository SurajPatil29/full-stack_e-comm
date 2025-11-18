import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../ProductItem";
import ProductItemSkeleton from "../ProductItem/ProductItemSkeleton";
function ProductsSlider({ items, data = [], loading }) {
	// product slider show products
	return (
		<div className="productsSlider py-4 smlBtn">
			{loading ? (
				<div className="grid grid-cols-5 gap-6 ">
					{Array.from({ length: 5 }).map((_, i) => (
						<ProductItemSkeleton key={i} />
					))}
				</div>
			) : (
				<Swiper
					slidesPerView={items}
					loop={data?.length >= items * 2}
					spaceBetween={40}
					navigation={true}
					modules={[Navigation]}
					className="mySwiper"
				>
					{data?.map((item, i) => (
						<SwiperSlide key={i}>
							<ProductItem item={item} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
}

ProductsSlider.propTypes = {
	items: PropTypes.number.isRequired,
};

export default ProductsSlider;
