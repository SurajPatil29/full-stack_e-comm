import { Breadcrumbs, Button, Rating, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ProductZoom from "../../componants/ProductZoom";
import { useState } from "react";
import QtyBox from "../../componants/QtyBox";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import ProductsSlider from "../../componants/ProductsSlider";

function ProductDetails() {
	const [productActionIndex, setProductActionIndex] = useState(null);

	const [activeTab, setActiveTab] = useState(0);

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

					<div className="productContent w-[60%] pr-10">
						<h1 className="text-[24px] font-[600] mb-2 ">
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
							<span className="text-[14px] ">
								Available In Stock :{" "}
								<span className="text-green-600 font-bold ">147 Items</span>
							</span>
						</div>
						<br />
						<p className="text-[14px] pr-10 mb-5 ">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
							dignissimos in quibusdam, ratione sit rem? Doloremque iste dicta
							nemo eveniet quibusdam cum adipisci vel veritatis quos distinctio
							non obcaecati, deleniti quaerat numquam alias autem commodi? Sit
							earum culpa impedit velit molestias distinctio voluptatum nihil,
							illo enim numquam id consectetur odio facere alias explicabo amet,
							optio iusto repellendus reprehenderit ratione iure? Nulla placeat
							suscipit deleniti ipsa vel magni dignissimos consectetur dicta!
						</p>

						<div className="flex item-center gap-3">
							<span className="text-[16px] ">Size:</span>
							<div className="flex items-center gap-1 actions ">
								<Button
									className={`${
										productActionIndex === 0 && "!bg-[#ff5252] !text-white"
									}`}
									onClick={() => setProductActionIndex(0)}
								>
									S
								</Button>
								<Button
									className={`${
										productActionIndex === 1 && "!bg-[#ff5252] !text-white"
									}`}
									onClick={() => setProductActionIndex(1)}
								>
									M
								</Button>
								<Button
									className={`${
										productActionIndex === 2 && "!bg-[#ff5252] !text-white"
									}`}
									onClick={() => setProductActionIndex(2)}
								>
									L
								</Button>
								<Button
									className={`${
										productActionIndex === 3 && "!bg-[#ff5252] !text-white"
									}`}
									onClick={() => setProductActionIndex(3)}
								>
									XL
								</Button>
							</div>
						</div>

						<p className="text-[14px] my-2">
							Free Shipping (Est. Delivery Time 2-3 Days){" "}
						</p>
						<div className="flex items-center mt-4 gap-4">
							<div className="qtyBoxWrapper w-[70px] ">
								<QtyBox />
							</div>
							<Button className="btn-org flex gap-2">
								<HiOutlineShoppingCart className="text-[22px]" /> Add To Cart
							</Button>
						</div>

						<div className="flex items-center gap-4 mt-4 ">
							<span className="flex items-center gap-3 text-[14px] font-[500] link cursor-pointer ">
								<FaRegHeart className="text-[18px]" /> Add to Wishlist
							</span>
							<span className="flex items-center gap-3 text-[14px] font-[500] link cursor-pointer ">
								<IoGitCompareOutline className="text-[18px]" /> Add to Compair
							</span>
						</div>
					</div>
				</div>

				<div className="container py-10 ">
					<div className="flex item-center gap-8">
						<span
							onClick={() => setActiveTab(0)}
							className={`link test-[17px] curser-pointer font-[500] ${
								activeTab === 0 && "text-[#ff5151]"
							} `}
						>
							Description
						</span>
						<span
							onClick={() => setActiveTab(1)}
							className={`link test-[17px] curser-pointer font-[500] ${
								activeTab === 1 && "text-[#ff5151]"
							} `}
						>
							Product Details
						</span>
						<span
							onClick={() => setActiveTab(2)}
							className={`link test-[17px] curser-pointer font-[500] ${
								activeTab === 2 && "text-[#ff5151]"
							} `}
						>
							Reviews (5)
						</span>
					</div>

					{activeTab === 0 && (
						<div className="shadow-md w-[80%] py-4 px-8 rounded-md ">
							<p>
								The best is yet to come! Give your walls a voice with a framed
								poster. This aesthethic, optimistic poster will look great in
								your desk or in an open-space office. Painted wooden frame with
								passe-partout for more depth.
							</p>

							<h4>Lightweight Design</h4>
							<p>
								Designed with a super light geometric case, the Versa family
								watches are slim, casual and comfortable enough to wear all day
								and night. Switch up your look with classic, leather, metal and
								woven accessory bands. Ut elit tellus, luctus nec ullamcorper
								mattis, pulvinar dapibus leo.
							</p>

							<h4>Free Shipping & Return</h4>
							<p>
								We offer free shipping for products on orders above 50$ and
								offer free delivery for all orders in US.
							</p>

							<h4>Money Back Guarantee</h4>
							<p>
								We guarantee our products and you could get back all of your
								money anytime you want in 30 days.
							</p>

							<h4>Online Support</h4>
							<p>
								You will get 24 hour support with this purchase product and you
								can return it within 30 days for an exchange.
							</p>
						</div>
					)}

					{activeTab === 1 && (
						<div className="shadow-md w-[80%] py-4 px-8 rounded-md ">
							<div className="relative overflow-x-auto">
								<table className="w-full text-sm text-left rtl:text-right text-gray-500">
									<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
										<tr>
											<th scope="col" className="px-6 py-3">
												Stand Up
											</th>
											<th scope="col" className="px-6 py-3">
												Folded (w/o wheels)
											</th>
											<th scope="col" className="px-6 py-3">
												Folded (w/ wheels)
											</th>
											<th scope="col" className="px-6 py-3">
												Door Pass Through
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="bg-white border-b font-[500] ">
											<td className="px-6 py-4 font-[500]">
												35″L x 24″W x 37-45″H(front to back wheel)
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 18.5″W x 16.5″H
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 24″W x 18.5″H
											</td>
											<td className="px-6 py-4 font-[500]">24</td>
										</tr>
										<tr className="bg-white border-b font-[500] ">
											<td className="px-6 py-4 font-[500]">
												35″L x 24″W x 37-45″H(front to back wheel)
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 18.5″W x 16.5″H
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 24″W x 18.5″H
											</td>
											<td className="px-6 py-4 font-[500]">24</td>
										</tr>
										<tr className="bg-white border-b font-[500] ">
											<td className="px-6 py-4 font-[500]">
												35″L x 24″W x 37-45″H(front to back wheel)
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 18.5″W x 16.5″H
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 24″W x 18.5″H
											</td>
											<td className="px-6 py-4 font-[500]">24</td>
										</tr>
										<tr className="bg-white border-b font-[500] ">
											<td className="px-6 py-4 font-[500]">
												35″L x 24″W x 37-45″H(front to back wheel)
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 18.5″W x 16.5″H
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 24″W x 18.5″H
											</td>
											<td className="px-6 py-4 font-[500]">24</td>
										</tr>
										<tr className="bg-white border-b font-[500] ">
											<td className="px-6 py-4 font-[500]">
												35″L x 24″W x 37-45″H(front to back wheel)
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 18.5″W x 16.5″H
											</td>
											<td className="px-6 py-4 font-[500]">
												32.5″L x 24″W x 18.5″H
											</td>
											<td className="px-6 py-4 font-[500]">24</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					)}

					{activeTab === 2 && (
						<div className="shadow-md w-[80%] py-4 px-8 rounded-md ">
							<div className="w-full productReviewContainer">
								<h2>Customer Questions & Answers</h2>
								<div className="scroll w-full my-4 max-h-[300px] overflow-y-scroll overflow-x-hidden mt-4 ">
									<div className="review mb-5 px-4 shadow-md w-full flex items-center justify-between">
										<div className="info w-[60%] flex items-center gap-3 ">
											<div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
												<img
													src="https://www.amity.edu/gurugram/microbackoffice/Uploads/TestimonialImage/98testi_RajivBasavaalumni.jpg"
													alt="user img"
													className="w-full"
												/>
											</div>
											<div className="w-[80%]">
												<h4 className="text-[16px] ">Suraj Patil</h4>
												<h5 className="text-[13px] mb-0 ">2025-1-3</h5>
												<p className="mt-0">
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quidem, officia numquam veritatis, perspiciatis
													minus harum exercitationem accusantium magnam neque
													aut rerum ea, hic est facere.
												</p>
											</div>
										</div>
										<div className=" flex items-end justify-end">
											<Rating name="size-small" defaultValue={4} readOnly />
										</div>
									</div>{" "}
									<div className="review mb-5 px-4 shadow-md w-full flex items-center justify-between">
										<div className="info w-[60%] flex items-center gap-3 ">
											<div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
												<img
													src="https://www.amity.edu/gurugram/microbackoffice/Uploads/TestimonialImage/98testi_RajivBasavaalumni.jpg"
													alt="user img"
													className="w-full"
												/>
											</div>
											<div className="w-[80%]">
												<h4 className="text-[16px] ">Suraj Patil</h4>
												<h5 className="text-[13px] mb-0 ">2025-1-3</h5>
												<p className="mt-0">
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quidem, officia numquam veritatis, perspiciatis
													minus harum exercitationem accusantium magnam neque
													aut rerum ea, hic est facere.
												</p>
											</div>
										</div>
										<div className=" flex items-end justify-end">
											<Rating name="size-small" defaultValue={4} readOnly />
										</div>
									</div>{" "}
									<div className="review mb-5 px-4 shadow-md w-full flex items-center justify-between">
										<div className="info w-[60%] flex items-center gap-3 ">
											<div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
												<img
													src="https://www.amity.edu/gurugram/microbackoffice/Uploads/TestimonialImage/98testi_RajivBasavaalumni.jpg"
													alt="user img"
													className="w-full"
												/>
											</div>
											<div className="w-[80%]">
												<h4 className="text-[16px] ">Suraj Patil</h4>
												<h5 className="text-[13px] mb-0 ">2025-1-3</h5>
												<p className="mt-0">
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quidem, officia numquam veritatis, perspiciatis
													minus harum exercitationem accusantium magnam neque
													aut rerum ea, hic est facere.
												</p>
											</div>
										</div>
										<div className=" flex items-end justify-end">
											<Rating name="size-small" defaultValue={4} readOnly />
										</div>
									</div>{" "}
									<div className="review mb-5 px-4 shadow-md w-full flex items-center justify-between">
										<div className="info w-[60%] flex items-center gap-3 ">
											<div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
												<img
													src="https://www.amity.edu/gurugram/microbackoffice/Uploads/TestimonialImage/98testi_RajivBasavaalumni.jpg"
													alt="user img"
													className="w-full"
												/>
											</div>
											<div className="w-[80%]">
												<h4 className="text-[16px] ">Suraj Patil</h4>
												<h5 className="text-[13px] mb-0 ">2025-1-3</h5>
												<p className="mt-0">
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quidem, officia numquam veritatis, perspiciatis
													minus harum exercitationem accusantium magnam neque
													aut rerum ea, hic est facere.
												</p>
											</div>
										</div>
										<div className=" flex items-end justify-end">
											<Rating name="size-small" defaultValue={4} readOnly />
										</div>
									</div>{" "}
									<div className="review mb-5 px-4 shadow-md w-full flex items-center justify-between">
										<div className="info w-[60%] flex items-center gap-3 ">
											<div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
												<img
													src="https://www.amity.edu/gurugram/microbackoffice/Uploads/TestimonialImage/98testi_RajivBasavaalumni.jpg"
													alt="user img"
													className="w-full"
												/>
											</div>
											<div className="w-[80%]">
												<h4 className="text-[16px] ">Suraj Patil</h4>
												<h5 className="text-[13px] mb-0 ">2025-1-3</h5>
												<p className="mt-0">
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quidem, officia numquam veritatis, perspiciatis
													minus harum exercitationem accusantium magnam neque
													aut rerum ea, hic est facere.
												</p>
											</div>
										</div>
										<div className=" flex items-end justify-end">
											<Rating name="size-small" defaultValue={4} readOnly />
										</div>
									</div>{" "}
									<div className="review mb-5 px-4 shadow-md w-full flex items-center justify-between">
										<div className="info w-[60%] flex items-center gap-3 ">
											<div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
												<img
													src="https://www.amity.edu/gurugram/microbackoffice/Uploads/TestimonialImage/98testi_RajivBasavaalumni.jpg"
													alt="user img"
													className="w-full"
												/>
											</div>
											<div className="w-[80%]">
												<h4 className="text-[16px] ">Suraj Patil</h4>
												<h5 className="text-[13px] mb-0 ">2025-1-3</h5>
												<p className="mt-0">
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quidem, officia numquam veritatis, perspiciatis
													minus harum exercitationem accusantium magnam neque
													aut rerum ea, hic est facere.
												</p>
											</div>
										</div>
										<div className=" flex items-end justify-end">
											<Rating name="size-small" defaultValue={4} readOnly />
										</div>
									</div>{" "}
									<div className="review mb-5 px-4 shadow-md w-full flex items-center justify-between">
										<div className="info w-[60%] flex items-center gap-3 ">
											<div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
												<img
													src="https://www.amity.edu/gurugram/microbackoffice/Uploads/TestimonialImage/98testi_RajivBasavaalumni.jpg"
													alt="user img"
													className="w-full"
												/>
											</div>
											<div className="w-[80%]">
												<h4 className="text-[16px] ">Suraj Patil</h4>
												<h5 className="text-[13px] mb-0 ">2025-1-3</h5>
												<p className="mt-0">
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quidem, officia numquam veritatis, perspiciatis
													minus harum exercitationem accusantium magnam neque
													aut rerum ea, hic est facere.
												</p>
											</div>
										</div>
										<div className=" flex items-end justify-end">
											<Rating name="size-small" defaultValue={4} readOnly />
										</div>
									</div>{" "}
									<div className="review mb-5 px-4 shadow-md w-full flex items-center justify-between">
										<div className="info w-[60%] flex items-center gap-3 ">
											<div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
												<img
													src="https://www.amity.edu/gurugram/microbackoffice/Uploads/TestimonialImage/98testi_RajivBasavaalumni.jpg"
													alt="user img"
													className="w-full"
												/>
											</div>
											<div className="w-[80%]">
												<h4 className="text-[16px] ">Suraj Patil</h4>
												<h5 className="text-[13px] mb-0 ">2025-1-3</h5>
												<p className="mt-0">
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quidem, officia numquam veritatis, perspiciatis
													minus harum exercitationem accusantium magnam neque
													aut rerum ea, hic est facere.
												</p>
											</div>
										</div>
										<div className=" flex items-end justify-end">
											<Rating name="size-small" defaultValue={4} readOnly />
										</div>
									</div>{" "}
									<div className="review mb-5 px-4 shadow-md w-full flex items-center justify-between">
										<div className="info w-[60%] flex items-center gap-3 ">
											<div className="img w-[80px] h-[80px] overflow-hidden rounded-full ">
												<img
													src="https://www.amity.edu/gurugram/microbackoffice/Uploads/TestimonialImage/98testi_RajivBasavaalumni.jpg"
													alt="user img"
													className="w-full"
												/>
											</div>
											<div className="w-[80%]">
												<h4 className="text-[16px] ">Suraj Patil</h4>
												<h5 className="text-[13px] mb-0 ">2025-1-3</h5>
												<p className="mt-0">
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quidem, officia numquam veritatis, perspiciatis
													minus harum exercitationem accusantium magnam neque
													aut rerum ea, hic est facere.
												</p>
											</div>
										</div>
										<div className=" flex items-end justify-end">
											<Rating name="size-small" defaultValue={4} readOnly />
										</div>
									</div>
								</div>
								<div className="reviewForm bg-[#fafafa] p-4 rounded-md ">
									<span className="flex items-center justify-between">
										<h2 className="text-[18px] ">Add a Review</h2>
										<span className="flex items-center justify-between gap-3">
											<h2 className="text-[18px] ">Add a Rating : </h2>
											<Rating name="size-small" defaultValue={0} />
										</span>
									</span>

									<form className="w-full mt-5">
										<TextField
											id="outlined-multiline-flexible"
											multiline
											label="Write a Review...."
											rows={4}
											className="w-full text-[#ff5151]"
										/>
										<div className="flex items-center mt-5">
											<Button className="btn-org">Submit Review</Button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="container">
					<h2 className="text-[20px]">Related Products</h2>
					<ProductsSlider items={6} />
				</div>
			</section>
		</>
	);
}

export default ProductDetails;
