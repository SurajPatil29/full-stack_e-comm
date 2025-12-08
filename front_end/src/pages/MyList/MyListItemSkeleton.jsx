// MyListItemSkeleton.jsx
function MyListItemSkeleton() {
	return (
		<div className="w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)] animate-pulse">
			{/* LEFT IMAGE SKELETON */}
			<div className="w-[15%] h-[90px] bg-gray-200 rounded-md"></div>

			{/* RIGHT CONTENT */}
			<div className="w-[85%] relative">
				{/* CLOSE ICON SKELETON */}
				<div className="absolute top-0 right-0 w-5 h-5 bg-gray-200 rounded"></div>

				{/* BRAND */}
				<div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>

				{/* TITLE */}
				<div className="w-40 h-5 bg-gray-300 rounded mb-2"></div>

				{/* RATING */}
				<div className="flex gap-1 mb-3">
					<div className="w-4 h-4 bg-gray-200 rounded"></div>
					<div className="w-4 h-4 bg-gray-200 rounded"></div>
					<div className="w-4 h-4 bg-gray-200 rounded"></div>
					<div className="w-4 h-4 bg-gray-200 rounded"></div>
					<div className="w-4 h-4 bg-gray-200 rounded"></div>
				</div>

				{/* PRICE ROW */}
				<div className="flex items-center gap-4 mb-4">
					<div className="w-16 h-4 bg-gray-200 rounded"></div>
					<div className="w-14 h-4 bg-gray-200 rounded"></div>
					<div className="w-12 h-4 bg-gray-200 rounded"></div>
				</div>

				{/* BUTTON SKELETON */}
				<div className="w-28 h-9 bg-gray-300 rounded-full"></div>
			</div>
		</div>
	);
}

export default MyListItemSkeleton;
