import PropTypes from "prop-types";
const statusStyles = {
	pending: {
		bg: "#FEF3C7", // light amber
		text: "#B45309", // amber-700
		border: "#F59E0B",
	},
	confirmed: {
		bg: "#DBEAFE", // light blue
		text: "#1D4ED8", // blue-700
		border: "#3B82F6",
	},
	shipped: {
		bg: "#EDE9FE", // light purple
		text: "#6D28D9", // purple-700
		border: "#8B5CF6",
	},
	delivered: {
		bg: "#DCFCE7", // light green
		text: "#15803D", // green-700
		border: "#22C55E",
	},
};

function Badges({ status = "pending" }) {
	const style = statusStyles[status] || statusStyles.pending;

	return (
		<span
			style={{
				backgroundColor: style.bg,
				color: style.text,
				border: `1px solid ${style.border}`,
				padding: "4px 10px",
				borderRadius: "999px",
				fontSize: "12px",
				fontWeight: 600,
				textTransform: "capitalize",
				display: "inline-block",
			}}
		>
			{status}
		</span>
	);
}

export default Badges;
