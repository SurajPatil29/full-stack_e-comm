export default function ProductDetailsSkeleton({ className = "" }) {
	return (
		<div className={`container flex gap-8 animate-pulse ${className}`}>
			{/* LEFT — IMAGE ZOOM SKELETON */}
			<div className="w-[40%]">
				<div className="flex gap-3">
					{/* LEFT SMALL THUMBNAILS */}
					<div className="w-[15%] space-y-3">
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="w-full h-[90px] bg-gray-200 rounded-md" />
						))}
					</div>

					{/* MAIN BIG IMAGE */}
					<div className="w-[85%] h-[500px] bg-gray-200 rounded-xl" />
				</div>
			</div>

			{/* RIGHT — DETAILS SKELETON */}
			<div className="w-[60%] px-10 space-y-4">
				{/* TITLE */}
				<div className="h-7 bg-gray-200 rounded w-3/4" />

				{/* BRAND + RATING */}
				<div className="flex items-center gap-4">
					<div className="h-4 bg-gray-200 rounded w-32" />
					<div className="h-4 bg-gray-200 rounded w-20" />
					<div className="h-3 bg-gray-200 rounded w-16" />
				</div>

				{/* PRICE ROW */}
				<div className="flex items-center gap-4 mt-3">
					<div className="h-5 bg-gray-200 rounded w-20" />
					<div className="h-6 bg-gray-200 rounded w-16" />
					<div className="h-4 bg-gray-200 rounded w-14" />
					<div className="h-4 bg-gray-200 rounded w-20 ml-auto" />
				</div>

				{/* DESCRIPTION */}
				<div className="space-y-2 mt-4">
					<div className="h-3 bg-gray-200 rounded w-full" />
					<div className="h-3 bg-gray-200 rounded w-5/6" />
					<div className="h-3 bg-gray-200 rounded w-2/3" />
				</div>

				{/* SIZE / RAM OPTIONS */}
				<div className="grid grid-cols-3 gap-3 mt-3">
					<div className="h-10 bg-gray-200 rounded" />
					<div className="h-10 bg-gray-200 rounded" />
					<div className="h-10 bg-gray-200 rounded" />
				</div>

				{/* QTY + ADD TO CART */}
				<div className="flex items-center gap-4 mt-5">
					<div className="h-12 bg-gray-200 rounded w-20" />
					<div className="h-12 bg-gray-200 rounded w-40" />
				</div>

				{/* WISHLIST + COMPARE */}
				<div className="flex gap-6 mt-6">
					<div className="h-5 bg-gray-200 rounded w-32" />
					<div className="h-5 bg-gray-200 rounded w-36" />
				</div>
			</div>
		</div>
	);
}
