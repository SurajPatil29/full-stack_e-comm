import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function BannerBoxV2(props) {
	const side = (props.info || "").toLowerCase();
	const categoryId = props?.item?.catId;

	// console.log(props);

	return (
		<div className="bannerBoxV2 w-full overflow-hidden rounded-[6px] group relative">
			<img
				src={props.image}
				alt="sideBan"
				className="w-full transition-all duration-200 group-hover:scale-105"
			/>

			<div
				className={`info p-2 absolute top-0 ${
					side === "left" ? "left-0" : "right-0"
				} w-[50%] h-[100%] z-50 flex items-start justify-center flex-col`}
			>
				<h2
					title={props.title}
					className="text-[11px] sm:text-[18px] md:text-[22px] lg:text-[18px] font-[600]"
				>
					{props.title?.length > 20
						? props.title.slice(0, 20) + "..."
						: props.title}
				</h2>

				<span className="text-[13px] sm:text-[20px] md:text-[22px] lg:text-[20px] text-[#ff5151] font-[600] w-full">
					₹{props.price}
				</span>

				<div className="w-full">
					{categoryId && (
						<Link
							to={`/productListing/cat/${categoryId}`}
							className="link text-[11px] sm:text-[18px] md:text-[20px] lg:text-[16px] font-[500]"
						>
							SHOP NOW
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

BannerBoxV2.propTypes = {
	image: PropTypes.string.isRequired,
	info: PropTypes.string.isRequired,
	title: PropTypes.string,
	price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	item: PropTypes.shape({
		catId: PropTypes.string,
		subCatId: PropTypes.string,
		thirdsubCatId: PropTypes.string,
	}),
};

export default BannerBoxV2;
