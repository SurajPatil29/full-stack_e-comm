import { Breadcrumbs, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import ProductZoom from "../../componants/ProductZoom";

function ProductDetails() {
	return (
		<>
			<div className="py-5">
				<div className="container">
					<Breadcrumbs aria-label="breadcrumb">
						<Link
							underline="hover"
							color="inherit"
							href="/"
							className="link transition !text-[14px]"
						>
							Home
						</Link>
						<Link
							underline="hover"
							color="inherit"
							href="/"
							className="link transition !text-[14px]"
						>
							Fashion
						</Link>
						<Link
							underline="hover"
							color="inherit"
							className=" transition !text-[14px]"
						>
							Kurti Dress
						</Link>
					</Breadcrumbs>
				</div>
			</div>

			<section className="bg-white py-5">
				<div className="container flex gap-8  ">
					<div className="productZoomContainer w-[40%] ">
						<ProductZoom />
					</div>

					<div className="productContent w-[60%]">
						<h1 className="text-[22px] font-[600] mb-2 ">
							ChikanKari Women Kurta
						</h1>
						<div className="flex items-center gap-3">
							<span className="text-gray-400 text-[13px] ">
								Brands :{" "}
								<span className="font-[500] text-black opacity-75">
									House of Chikankari
								</span>
							</span>
							<Rating
								name="size-small"
								defaultValue={4}
								size="small"
								readOnly
							/>
							<span className="text-[13px cursor-pointer] ">Review(5)</span>
						</div>

						<div className="flex items-center gap-4 mt-4">
							<span className="oldPrice line-through text-grey-500 text-[18px] font-[500] ">
								$58.00
							</span>
							<span className="price text-[#ff5252] text-[18px] font-[600]">
								$50.00
							</span>
						</div>
						<br />
						<p className="text-[14px] ">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
							dignissimos in quibusdam, ratione sit rem? Doloremque iste dicta
							nemo eveniet quibusdam cum adipisci vel veritatis quos distinctio
							non obcaecati, deleniti quaerat numquam alias autem commodi? Sit
							earum culpa impedit velit molestias distinctio voluptatum nihil,
							illo enim numquam id consectetur odio facere alias explicabo amet,
							optio iusto repellendus reprehenderit ratione iure? Nulla placeat
							suscipit deleniti ipsa vel magni dignissimos consectetur dicta!
						</p>
					</div>
				</div>
			</section>
		</>
	);
}

export default ProductDetails;
