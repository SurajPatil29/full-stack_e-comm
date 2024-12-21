import AddBannerSlider from "../../componants/AddBannerSlider";
import { HomeCatSlider } from "../../componants/HomeCatSlider";
import { HomeSlider } from "../../componants/HomeSlider";
import { FaShippingFast } from "react-icons/fa";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import ProductsSlider from "../../componants/ProductsSlider";

function Home() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<>
			<HomeSlider />
			<HomeCatSlider />

			<section className="bg-white py-8">
				<div className="container ">
					<div className="flex items-center justify-between">
						<div className="leftSec text-black">
							<h2 className="text-[20px] font-[600]">Popular Products</h2>
							<p className="text-[14px] font-[400]">
								Do not miss the current offers util the end of March
							</p>
						</div>

						<div className="rightSec">
							<Box
								sx={{
									maxWidth: { xs: 320, sm: 480 },
									bgcolor: "background.paper",
								}}
							>
								<Tabs
									value={value}
									onChange={handleChange}
									variant="scrollable"
									scrollButtons="auto"
									aria-label="scrollable auto tabs example"
								>
									<Tab label="Fashion" />
									<Tab label="Electronics" />
									<Tab label="Bags" />
									<Tab label="Footwear" />
									<Tab label="Groceries" />
									<Tab label="Beauty" />
									<Tab label="Wellness" />
									<Tab label="Jewellery" />
								</Tabs>
							</Box>
						</div>
					</div>
					<ProductsSlider items={5} />
				</div>
			</section>

			<section className="py-16 p-4 bg-white">
				<div className="container ">
					<div className="freeShiping w-[80%] m-auto p-4 border-[3px] border-[#c33535] flex items-center justify-between rounded-lg">
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

				<AddBannerSlider items={3} />
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
