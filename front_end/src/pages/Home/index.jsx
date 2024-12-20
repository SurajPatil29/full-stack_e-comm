import { HomeCatSlider } from "../../componants/HomeCatSlider";
import { HomeSlider } from "../../componants/HomeSlider";
import { FaShippingFast } from "react-icons/fa";

function Home() {
	return (
		<>
			<HomeSlider />
			<HomeCatSlider />

			<section className="py-16 bg-white">
				<div className="container">
					<div className="freeShiping w-full p-4 border-[3px] border-[#c33535] flex items-center justify-between rounded-lg">
						<div className="col1 flex items-center gap-4">
							<FaShippingFast className="text-[#ff5252] text-[50px]" />
							<h1 className="text-[20px] font-[600] text-black">
								FREE SHIPPING
							</h1>
						</div>

						<div className="col2 ">
							<p className="text-[18px] font-[500] text-black">
								Free Delivery Now On Your First Order and over $200
							</p>
						</div>

						<div className="col3">
							{" "}
							<h1 className="text-[20px] font-[600] text-black">-ONLY $200*</h1>
						</div>
					</div>
				</div>
			</section>

			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}

export { Home };
