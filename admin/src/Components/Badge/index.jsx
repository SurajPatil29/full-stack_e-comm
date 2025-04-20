import PropTypes from "prop-types";

function Badges(props) {
	return (
		<span
			className={`inline-block py-1 px-4 text-[11px] rounded-full capitalize ${
				props.status === "pending" && "bg-[#ff5151] text-white "
			} ${props.status === "confirm" && "bg-green-500 text-white "}
            ${props.status === "delivered" && "bg-green-700 text-white "}
            `}
		>
			{props.status}
		</span>
	);
}

Badges.propTypes = {
	status: PropTypes.string.isRequired,
};
export default Badges;
