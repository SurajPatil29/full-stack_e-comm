export default function BlogItemSkeleton() {
	return (
		<div className="blogItem shadow-md rounded-md overflow-hidden border border-[rgba(0,0,0,0.1)] animate-pulse">
			{/* IMAGE SKELETON */}
			<div className="w-full h-[220px] bg-neutral-300"></div>

			{/* INFO SECTION */}
			<div className="py-4 space-y-3">
				{/* TITLE */}
				<div className="h-4 bg-neutral-300 rounded w-3/4 mx-2"></div>

				{/* DESCRIPTION (3 LINES) */}
				<div className="space-y-2 mx-2">
					<div className="h-3 bg-neutral-300 rounded w-full"></div>
					<div className="h-3 bg-neutral-300 rounded w-5/6"></div>
					<div className="h-3 bg-neutral-300 rounded w-2/3"></div>
				</div>

				{/* READ MORE BUTTON */}
				<div className="h-4 bg-neutral-300 rounded w-24 mx-2"></div>
			</div>
		</div>
	);
}
