import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Mousewheel } from "swiper/modules";
import PropTypes from "prop-types";
import BannerBoxV2 from "../BannerBoxV2";

function AddBannerSliderV2({ items, data, dir }) {
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
		<div className=" px-8 w-full  gap-4">
			<Swiper
				direction={dir} // "vertical"
				slidesPerView={items} // 2 items
				loop={data.length > items}
				spaceBetween={16}
				// MOUSEWHEEL only when vertical
				mousewheel={dir === "vertical" && window.innerWidth >= 1024} // NAVIGATION only when horizontal
				navigation={dir === "horizontal" && window.innerWidth >= 1024}
				modules={[Navigation, Mousewheel]}
				className="smlBtn"
				style={{ height: dir === "vertical" ? "470px" : "auto" }}
			>
				{data.map((item, i) =>
					item.slide === dir ? (
						<SwiperSlide key={i} className="h-auto lg:h-[50%]">
							<BannerBoxV2
								info={item.angle}
								image={item.images?.[0] || ""}
								title={item.title}
								price={item.price}
							/>
						</SwiperSlide>
					) : null
				)}
			</Swiper>
		</div>
	);
}

AddBannerSliderV2.propTypes = {
	items: PropTypes.number.isRequired,
};
export default AddBannerSliderV2;
