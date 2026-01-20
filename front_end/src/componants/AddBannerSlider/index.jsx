import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import PropTypes from "prop-types";

function AddBannerSlider({ items, data, prodType }) {
	// in this componant i was create banner slider
	if (!data || data.length === 0) {
		return (
			<div className="homeSliderV2 py-4">
				<div className="w-full">
					<div
						className="h-[300px] sm:h-[380px] md:h-[420px]
						bg-[#f3f3f3] rounded-md border border-gray-300
						flex items-center justify-center"
					>
						<p className="text-gray-500 text-lg font-medium">
							No Banners Available
						</p>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="pt-10 px-8 w-full">
			<Swiper
				loop={data?.length > items}
				spaceBetween={16}
				navigation={false}
				modules={[Navigation]}
				className="smlBtn"
				breakpoints={{
					// 📱 Mobile
					0: {
						slidesPerView: 1.2,
						spaceBetween: 12,
						navigation: false,
					},

					// 📱 Tablet
					640: {
						slidesPerView: 2.2,
						spaceBetween: 20,
						navigation: false,
					},

					// 💻 Desktop
					1024: {
						slidesPerView: items, // 3
						spaceBetween: 30,
						navigation: true,
					},
				}}
			>
				{data?.length !== 0 && data.length > 0
					? data?.map((item, i) =>
							prodType === item.prodType ? (
								<SwiperSlide key={i}>
									<BannerBox img={item.images[0]} link={"/"} />
								</SwiperSlide>
							) : null
					  )
					: null}
				{/* <SwiperSlide>
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
				</SwiperSlide> */}
			</Swiper>
		</div>
	);
}
AddBannerSlider.propTypes = {
	items: PropTypes.number.isRequired,
};
export default AddBannerSlider;
