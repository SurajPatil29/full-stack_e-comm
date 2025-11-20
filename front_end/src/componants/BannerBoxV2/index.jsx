import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function BannerBoxV2(props) {
	const side = (props.info || "").toLowerCase();

	return (
		<div className="bannerBoxV2 w-full overflow-hidden rounded-md group relative">
			<img
				src={props.image}
				alt="sideBan"
				className="w-full transition-all duration-200 group-hover:scale-105"
			/>

			<div
				className={`info p-2 absolute top-0 ${
					side === "left" ? "left-0" : "right-0"
				} w-[50%] h-[100%] z-50 flex items-center justify-center flex-col`}
			>
				<h2 className="text-[18px] font-[600]">{props.title}</h2>

				<span className="text-[20px] text-[#ff5151] font-[600] w-full">
					₹{props.price}
				</span>

				<div className="w-full">
					<Link to="/" className="link text-[16px] font-[500]">
						SHOP NOW
					</Link>
				</div>
			</div>
		</div>
	);
}

BannerBoxV2.propTypes = {
	image: PropTypes.string.isRequired,
	info: PropTypes.string.isRequired, // FIXED
	title: PropTypes.string,
	price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BannerBoxV2;
