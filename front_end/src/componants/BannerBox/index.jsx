import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function BannerBox({ img, link }) {
	// here i write code for img div this will take a 2 props img and link
	return (
		<div className=" box bannerBox overflow-hidden rounded-3xl group">
			<Link to={link}>
				<img
					src={img}
					alt="imgBan"
					className="w-full transition-all group-hover:scale-110 group-hover:rotate-1"
				/>
			</Link>
		</div>
	);
}

BannerBox.propTypes = {
	img: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
};

export default BannerBox;
