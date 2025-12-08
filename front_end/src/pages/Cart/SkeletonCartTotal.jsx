function SkeletonCartTotal() {
	return (
		<div className="shadow-md rounded-md bg-white p-5 sticky top-[155px] z-auto animate-pulse">
			{/* Title */}
			<div className="h-5 w-32 bg-gray-300 rounded mb-4"></div>

			<hr className="mb-4" />

			{/* Subtotal */}
			<div className="flex justify-between items-center mb-3">
				<div className="h-4 w-20 bg-gray-300 rounded"></div>
				<div className="h-4 w-16 bg-gray-300 rounded"></div>
			</div>

			{/* Shipping */}
			<div className="flex justify-between items-center mb-3">
				<div className="h-4 w-20 bg-gray-300 rounded"></div>
				<div className="h-4 w-14 bg-gray-300 rounded"></div>
			</div>

			{/* Total */}
			<div className="flex justify-between items-center mb-5">
				<div className="h-4 w-20 bg-gray-300 rounded"></div>
				<div className="h-4 w-20 bg-gray-300 rounded"></div>
			</div>

			{/* Checkout Button */}
			<div className="h-10 w-full bg-gray-300 rounded-lg"></div>
		</div>
	);
}

export default SkeletonCartTotal;
