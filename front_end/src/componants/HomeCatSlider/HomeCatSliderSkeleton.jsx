export default function HomeCatSliderSkeleton() {
	return (
		<div className="homeCatSlider py-4 pb-8">
			<div className="container">
				<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="py-7 px-3 bg-neutral-200 rounded-[30px] animate-pulse flex items-center justify-center flex-col"
						>
							<div className="w-[60px] h-[60px] bg-neutral-300 rounded-full mb-3"></div>
							<div className="h-3 w-16 bg-neutral-300 rounded"></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
