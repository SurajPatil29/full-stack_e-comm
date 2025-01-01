import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PropTypes from "prop-types";
import BannerBoxV2 from "../BannerBoxV2";

function AddBannerSliderV2(props) {
	// in this componant i was create banner slider
	return (
		<div className="pt-10 px-8 w-full">
			<Swiper
				slidesPerView={props.items}
				loop={true}
				spaceBetween={30}
				navigation={true}
				modules={[Navigation]}
				className="smlBtn"
			>
				<SwiperSlide>
					<BannerBoxV2
						info="right"
						image={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734965945/sub-banner-2_sduheq.jpg"
						}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<BannerBoxV2
						info="right"
						image={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734965945/sub-banner-2_sduheq.jpg"
						}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<BannerBoxV2
						info="left"
						image={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734965948/sub-banner-1_kky0b0.jpg"
						}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<BannerBoxV2
						info="left"
						image={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734965948/sub-banner-1_kky0b0.jpg"
						}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<BannerBoxV2
						info="left"
						image={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734965948/sub-banner-1_kky0b0.jpg"
						}
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
AddBannerSliderV2.propTypes = {
	items: PropTypes.number.isRequired,
};
export default AddBannerSliderV2;
