import { Button } from "@mui/material";
import AccountSideBar from "../../componants/AccountSideBar";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badges from "../../componants/Badge";
import { useState } from "react";

const Orders = () => {
	const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

	const isShowOrderdProduct = (index) => {
		if (isOpenOrderdProduct === index) {
			setIsOpenOrderdProduct(null);
		} else {
			setIsOpenOrderdProduct(index);
		}
	};
	return (
		<section className="section py-10 ">
			<div className="container  min-w-[80%] flex gap-5">
				<div className="col1 w-[20%] ">
					<AccountSideBar />
				</div>
				<div className="leftPart w-[80%] ">
					<div className="shadow-md rounded-md  bg-white">
						<div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)] ">
							<h2>My orders</h2>
							<p className="mt-0">
								There are <span className="font-bold text-[#ff5151]">2</span>{" "}
								orders
							</p>
							<div className="relative overflow-x-auto mt-5">
								<table className="w-full text-sm text-left rtl:text-right text-gray-500">
									<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
										<tr>
											<th scope="col" className="px-6 py-3">
												&nbsp;
											</th>
											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												Order Id
											</th>
											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												Product Id
											</th>
											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												Name
											</th>
											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												Address
											</th>
											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												Pincode
											</th>
											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												Total Amount
											</th>
											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												Email
											</th>

											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												User Id
											</th>
											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												Order Status
											</th>
											<th scope="col" className="px-6 py-3 whitespace-nowrap">
												Date
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="bg-white border-b font-[500] ">
											<td className="px-6 py-4 font-[500]">
												<Button
													className="!w-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] "
													onClick={() => isShowOrderdProduct(0)}
												>
													{isOpenOrderdProduct === 0 ? (
														<FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)] " />
													) : (
														<FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)] " />
													)}
												</Button>
											</td>
											<td className="px-6 py-4 font-[500]">
												<span className="text-[#ff5151]">6622577941265403</span>
											</td>
											<td className="px-6 py-4 font-[500]">
												<span className="text-[#ff5151]">pym_id125895</span>
											</td>
											<td className="px-6 py-4 font-[500] whitespace-nowrap">
												Suraj Patil
											</td>
											<td className="px-6 py-4 font-[500]">0231456789</td>
											<td className="px-6 py-4 font-[500]">
												<span className="block w-[300px]">
													h no 111 streat gandhi adarsh collony{" "}
												</span>
											</td>
											<td className="px-6 py-4 font-[500]">110033</td>
											<td className="px-6 py-4 font-[500]">3080</td>
											<td className="px-6 py-4 font-[500]">
												<span className="text-[#ff5151]">52311799521233</span>
											</td>
											<td className="px-6 py-4 font-[500]">
												<Badges status="delivered" />
											</td>
											<td className="px-6 py-4 font-[500] whitespace-nowrap">
												2025-2-22
											</td>
										</tr>

										{isOpenOrderdProduct === 0 && (
											<tr>
												<td className=" pl-20 " colSpan="6">
													<div className="relative overflow-x-auto ">
														<table className="w-full text-sm text-left rtl:text-right text-gray-500">
															<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
																<tr>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Product Id
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Product Title
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Image
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Quantity
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Price
																	</th>
																	<th
																		scope="col"
																		className="px-6 py-3 whitespace-nowrap"
																	>
																		Sub Total
																	</th>
																</tr>
															</thead>
															<tbody>
																<tr className="bg-white border-b font-[500] ">
																	<td className="px-6 py-4 font-[500]">
																		<span className="text-[#ff5151]">
																			6622577941265403
																		</span>
																	</td>
																	<td className="px-6 py-4 font-[500]">
																		A-line kurti with Sharara and Dupatta
																	</td>
																	<td className="px-6 py-4 font-[500] whitespace-nowrap">
																		<img
																			src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
																			alt=""
																			className="w-[40px] h-[40px] object-cover rounded-md "
																		/>
																	</td>
																	<td className="px-6 py-4 font-[500]">2</td>
																	<td className="px-6 py-4 font-[500]">1300</td>
																	<td className="px-6 py-4 font-[500]">1300</td>
																</tr>
															</tbody>
														</table>
													</div>
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Orders;
