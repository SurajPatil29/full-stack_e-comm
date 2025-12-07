// components/SkeletonCartItem.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * SkeletonCard for cart item
 * - uses Tailwind's animate-pulse
 * - accessible: aria-busy + aria-label
 */
export function SkeletonCartItem({
	className = "",
	ariaLabel = "Loading cart item",
}) {
	return (
		<div
			className={`cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.08)] animate-pulse ${className}`}
			role="status"
			aria-busy="true"
			aria-label={ariaLabel}
		>
			{/* image */}
			<div className="img w-[15%] min-w-[60px] group border border-[rgba(0,0,0,0.06)] rounded-md overflow-hidden">
				<div className="w-full h-[56px] bg-gray-200 rounded-md" />
			</div>

			{/* info */}
			<div className="info w-[85%] relative space-y-2">
				{/* close button area (empty) */}
				<div className="w-[22px] h-[22px] rounded-full bg-transparent" />

				{/* brand */}
				<div className="w-[25%] h-3 bg-gray-200 rounded" />

				{/* title */}
				<div className="w-[60%] h-4 bg-gray-200 rounded" />

				{/* rating */}
				<div className="w-[20%] h-3 bg-gray-200 rounded" />

				{/* dropdowns */}
				<div className="flex items-center gap-4 mt-1">
					<div className="w-[64px] h-8 bg-gray-200 rounded" />
					<div className="w-[64px] h-8 bg-gray-200 rounded" />
					<div className="w-[64px] h-8 bg-gray-200 rounded" />
					<div className="w-[64px] h-8 bg-gray-200 rounded" />
				</div>

				{/* price row */}
				<div className="flex items-center gap-4 mt-2">
					<div className="w-[80px] h-5 bg-gray-200 rounded" />
					<div className="w-[60px] h-4 bg-gray-200 rounded" />
					<div className="w-[60px] h-4 bg-gray-200 rounded" />
				</div>
			</div>
		</div>
	);
}

SkeletonCartItem.propTypes = {
	className: PropTypes.string,
	ariaLabel: PropTypes.string,
};

/**
 * Renders multiple skeletons
 * <SkeletonCart count={3} />
 */
export default function SkeletonCart({ count = 3, className = "" }) {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<SkeletonCartItem
					key={i}
					className={className}
					ariaLabel={`Loading cart item ${i + 1}`}
				/>
			))}
		</>
	);
}

SkeletonCart.propTypes = {
	count: PropTypes.number,
	className: PropTypes.string,
};
