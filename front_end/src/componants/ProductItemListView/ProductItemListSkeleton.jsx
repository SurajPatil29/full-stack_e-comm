export default function ProductItemListSkeleton() {
	return (
		<div className="productItem shadow-md rounded-md overflow-hidden border-2 border-[rgba(0,0,0,0.1)] flex animate-pulse">
			{/* LEFT — IMAGE WRAPPER */}
			<div className="w-[25%] relative">
				<div className="h-[220px] w-full bg-neutral-300 rounded-md"></div>

				{/* discount badge */}
				<div className="absolute top-[10px] left-[10px] w-10 h-4 bg-neutral-400 rounded"></div>

				{/* right side action buttons */}
				<div className="absolute top-[15px] right-[15px] flex flex-col gap-3">
					<div className="w-[35px] h-[35px] bg-neutral-300 rounded-full"></div>
					<div className="w-[35px] h-[35px] bg-neutral-300 rounded-full"></div>
					<div className="w-[35px] h-[35px] bg-neutral-300 rounded-full"></div>
				</div>
			</div>

			{/* RIGHT — INFO */}
			<div className="w-[75%] px-4 py-4 space-y-3">
				{/* Brand */}
				<div className="h-3 bg-neutral-300 rounded w-24"></div>

				{/* Title */}
				<div className="h-4 bg-neutral-300 rounded w-3/4"></div>

				{/* Description (2–3 lines) */}
				<div className="space-y-2">
					<div className="h-3 bg-neutral-300 rounded w-full"></div>
					<div className="h-3 bg-neutral-300 rounded w-4/5"></div>
					<div className="h-3 bg-neutral-300 rounded w-2/3"></div>
				</div>

				{/* Rating */}
				<div className="flex gap-1">
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
					<div className="h-3 w-3 bg-neutral-300 rounded"></div>
				</div>

				{/* Price */}
				<div className="flex gap-4">
					<div className="h-4 w-16 bg-neutral-300 rounded"></div>
					<div className="h-4 w-20 bg-neutral-300 rounded"></div>
				</div>

				{/* Add to Cart button */}
				<div className="h-9 bg-neutral-300 rounded-md w-40 mt-3"></div>
			</div>
		</div>
	);
}
