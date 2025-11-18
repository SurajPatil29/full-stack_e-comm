export default function ProductItemSkeleton() {
	return (
		<div className="productItem shadow-md rounded-md overflow-hidden border-2 border-[rgba(0,0,0,0.1)] animate-pulse">
			{/* IMAGE AREA */}
			<div className="w-full h-[220px] bg-neutral-300"></div>

			{/* INFO */}
			<div className="p-3 py-4 space-y-3 bg-[#f8f6f6]">
				{/* Brand */}
				<div className="h-3 bg-neutral-300 rounded w-1/3"></div>

				{/* Title */}
				<div className="h-3 bg-neutral-300 rounded w-3/4"></div>

				{/* Rating */}
				<div className="flex gap-1">
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
				</div>

				{/* Prices */}
				<div className="flex gap-4">
					<div className="h-3 bg-neutral-300 rounded w-16"></div>
					<div className="h-3 bg-neutral-300 rounded w-12"></div>
				</div>
			</div>
		</div>
	);
}
