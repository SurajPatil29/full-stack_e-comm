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
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<ProductItemSkeleton key={i} />
					))}
				</div>
			) : (
				<Swiper
					slidesPerView={items}
					loop={data?.length >= 10}
					spaceBetween={12}
					navigation={false}
					modules={[Navigation]}
					breakpoints={{
						// 📱 Mobile
						0: {
							slidesPerView: 1.3,
							spaceBetween: 12,
							navigation: false,
						},

						// 📱 Tablet
						640: {
							slidesPerView: 2.2,
							spaceBetween: 16,
							navigation: false,
						},

						// 💻 Laptop
						1024: {
							slidesPerView: items || 4,
							spaceBetween: 24,
							navigation: true,
						},

						// 🖥️ Desktop
						1280: {
							slidesPerView: items || 5,
							spaceBetween: 40,
							navigation: true,
						},
					}}
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
