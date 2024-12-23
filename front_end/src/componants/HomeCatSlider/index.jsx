import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function HomeCatSlider() {
	return (
		<div className="homeCatSlider py-4 pb-8 text-black">
			<div className="container">
				<Swiper
					slidesPerView={6}
					loop={true}
					spaceBetween={40}
					navigation={true}
					modules={[Navigation]}
					className="mySwiper"
				>
					<SwiperSlide>
						<Link to="/">
							<div className="item py-7 px-3 bg-white rounded-[30px] text-center flex items-center justify-center flex-col">
								<img
									src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685759/catimg1_dmjesy.png"
									alt="i1"
									className="w-[60px] transition-all"
								/>
								<h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide>
						<Link to="/">
							<div className="item py-7 px-3 bg-white rounded-[30px] text-center flex items-center justify-center flex-col">
								<img
									src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685759/catimg2_jd9kyr.png"
									alt="i2"
									className="w-[60px] transition-all"
								/>
								<h3 className="text-[15px] font-[500] mt-3">Electronics</h3>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide>
						<Link to="/">
							<div className="item py-7 px-3 bg-white rounded-[30px] text-center flex items-center justify-center flex-col">
								<img
									src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685759/catimg3_zgc7cl.png"
									alt="i3"
									className="w-[60px] transition-all"
								/>
								<h3 className="text-[15px] font-[500] mt-3">Bags</h3>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide>
						<Link to="/">
							<div className="item py-7 px-3 bg-white rounded-[30px] text-center flex items-center justify-center flex-col">
								<img
									src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685760/catimg4_hthaeb.png"
									alt="i4"
									className="w-[60px] transition-all"
								/>
								<h3 className="text-[15px] font-[500] mt-3">Footware</h3>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide>
						<Link to="/">
							<div className="item py-7 px-3 bg-white rounded-[30px] text-center flex items-center justify-center flex-col">
								<img
									src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685764/catimg5_tnl4wj.png"
									alt="i5"
									className="w-[60px] transition-all"
								/>
								<h3 className="text-[15px] font-[500] mt-3">Groceries</h3>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide>
						<Link to="/">
							<div className="item py-7 px-3 bg-white rounded-[30px] text-center flex items-center justify-center flex-col">
								<img
									src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685761/catimg6_tf2mmr.png"
									alt="i6"
									className="w-[60px] transition-all"
								/>
								<h3 className="text-[15px] font-[500] mt-3">Beauty</h3>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide>
						<Link to="/">
							<div className="item py-7 px-3 bg-white rounded-[30px] text-center flex items-center justify-center flex-col">
								<img
									src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685760/catimg7_lreqoa.png"
									alt="i7"
									className="w-[60px] transition-all"
								/>
								<h3 className="text-[15px] font-[500] mt-3">Wellness</h3>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide>
						<Link to="/">
							<div className="item py-7 px-3 bg-white rounded-[30px] text-center flex items-center justify-center flex-col">
								<img
									src="https://res.cloudinary.com/dzy2z9h7m/image/upload/v1734685761/catimg8_qvvbm1.png"
									alt="i8"
									className="w-[60px] transition-all"
								/>
								<h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
							</div>
						</Link>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
}

export { HomeCatSlider };
