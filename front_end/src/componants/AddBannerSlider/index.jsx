import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import PropTypes from "prop-types";

function AddBannerSlider(props) {
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
					<BannerBox
						img={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734699438/ban4_tthk9r.jpg"
						}
						link={"/"}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<BannerBox
						img={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734699438/ban3_ehqsre.jpg"
						}
						link={"/"}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<BannerBox
						img={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734699437/ban1_p2lou7.jpg"
						}
						link={"/"}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<BannerBox
						img={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734699436/ban2_thjgog.jpg"
						}
						link={"/"}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<BannerBox
						img={
							"https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734701026/ban5_coikrh.jpg"
						}
						link={"/"}
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
AddBannerSlider.propTypes = {
	items: PropTypes.number.isRequired,
};
export default AddBannerSlider;
