import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@mui/material";

function CartPanel() {
	return (
		<>
			<div className="scroll w-full max-h-[400px] overflow-y-scroll overflow-hidden ">
				<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.3)] mb-2 ">
					<div className="img w-[25%] border border-[rgba(0,0,0,0.1)] rounded-md group ">
						<Link to="/productDetails/123" className="block">
							<img
								className="w-full h-[80px] rounded-md group-hover:scale-105 "
								src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
								alt="productimg"
							/>
						</Link>
					</div>

					<div className="w-[75%] pr-7 relative ">
						<h4 className="text-[14px] font-[500] ">
							<Link className="link" to="/productDetails/123">
								Mens Cotton Casual Short Sleeve T-Shirts
							</Link>
						</h4>
						<h4 className="text-[13px] font-[500]">T-Shirt</h4>
						<p className="flex items-center gap-5">
							<span>
								Qty : <span> 2</span>
							</span>{" "}
							<span className="text-[#ff5151] font-bold">price : $25</span>
						</p>
						<Button className="!absolute !top-[2px] !right-[2px] rounded-full !w-[22px] !min-w-[22px] !h-[22px]  !bg-[#f1f1f1] !text-black !p-0">
							<MdDeleteOutline className="text-[#ff5151] text-[18px] " />
						</Button>
					</div>
				</div>

				<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.3)] mb-2 ">
					<div className="img w-[25%] border border-[rgba(0,0,0,0.1)] rounded-md ">
						<img
							className="w-full h-[80px] rounded-md"
							src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
							alt="productimg"
						/>
					</div>

					<div className="w-[75%] pr-7 relative ">
						<h4 className="text-[14px] font-[500] ">
							<Link className="link" to="/productDetails/123">
								Mens Cotton Casual Short Sleeve T-Shirts
							</Link>
						</h4>
						<h4 className="text-[13px] font-[500]">T-Shirt</h4>
						<p className="flex items-center gap-5">
							<span>
								Qty : <span> 2</span>
							</span>{" "}
							<span className="text-[#ff5151] font-bold">price : $25</span>
						</p>
						<Button className="!absolute !top-[2px] !right-[2px] rounded-full !w-[22px] !min-w-[22px] !h-[22px]  !bg-[#f1f1f1] !text-black !p-0">
							<MdDeleteOutline className="text-[#ff5151] text-[18px] " />
						</Button>
					</div>
				</div>

				<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.3)] mb-2 ">
					<div className="img w-[25%] border border-[rgba(0,0,0,0.1)] rounded-md ">
						<img
							className="w-full h-[80px] rounded-md"
							src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
							alt="productimg"
						/>
					</div>

					<div className="w-[75%] pr-7 relative ">
						<h4 className="text-[14px] font-[500] ">
							<Link className="link" to="/productDetails/123">
								Mens Cotton Casual Short Sleeve T-Shirts
							</Link>
						</h4>
						<h4 className="text-[13px] font-[500]">T-Shirt</h4>
						<p className="flex items-center gap-5">
							<span>
								Qty : <span> 2</span>
							</span>{" "}
							<span className="text-[#ff5151] font-bold">price : $25</span>
						</p>
						<Button className="!absolute !top-[2px] !right-[2px] rounded-full !w-[22px] !min-w-[22px] !h-[22px]  !bg-[#f1f1f1] !text-black !p-0">
							<MdDeleteOutline className="text-[#ff5151] text-[18px] " />
						</Button>
					</div>
				</div>

				<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.3)] mb-2 ">
					<div className="img w-[25%] border border-[rgba(0,0,0,0.1)] rounded-md ">
						<img
							className="w-full h-[80px] rounded-md"
							src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
							alt="productimg"
						/>
					</div>

					<div className="w-[75%] pr-7 relative ">
						<h4 className="text-[14px] font-[500] ">
							<Link className="link" to="/productDetails/123">
								Mens Cotton Casual Short Sleeve T-Shirts
							</Link>
						</h4>
						<h4 className="text-[13px] font-[500]">T-Shirt</h4>
						<p className="flex items-center gap-5">
							<span>
								Qty : <span> 2</span>
							</span>{" "}
							<span className="text-[#ff5151] font-bold">price : $25</span>
						</p>
						<Button className="!absolute !top-[2px] !right-[2px] rounded-full !w-[22px] !min-w-[22px] !h-[22px]  !bg-[#f1f1f1] !text-black !p-0">
							<MdDeleteOutline className="text-[#ff5151] text-[18px] " />
						</Button>
					</div>
				</div>

				<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.3)] mb-2 ">
					<div className="img w-[25%] border border-[rgba(0,0,0,0.1)] rounded-md ">
						<img
							className="w-full h-[80px] rounded-md"
							src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
							alt="productimg"
						/>
					</div>

					<div className="w-[75%] pr-7 relative ">
						<h4 className="text-[14px] font-[500] ">
							<Link className="link" to="/productDetails/123">
								Mens Cotton Casual Short Sleeve T-Shirts
							</Link>
						</h4>
						<h4 className="text-[13px] font-[500]">T-Shirt</h4>
						<p className="flex items-center gap-5">
							<span>
								Qty : <span> 2</span>
							</span>{" "}
							<span className="text-[#ff5151] font-bold">price : $25</span>
						</p>
						<Button className="!absolute !top-[2px] !right-[2px] rounded-full !w-[22px] !min-w-[22px] !h-[22px]  !bg-[#f1f1f1] !text-black !p-0">
							<MdDeleteOutline className="text-[#ff5151] text-[18px] " />
						</Button>
					</div>
				</div>

				<div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.3)] mb-2 ">
					<div className="img w-[25%] border border-[rgba(0,0,0,0.1)] rounded-md ">
						<img
							className="w-full h-[80px] rounded-md"
							src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/71-home_default/mug-today-is-a-good-day.jpg"
							alt="productimg"
						/>
					</div>

					<div className="w-[75%] pr-7 relative ">
						<h4 className="text-[14px] font-[500] ">
							<Link className="link" to="/productDetails/123">
								Mens Cotton Casual Short Sleeve T-Shirts
							</Link>
						</h4>
						<h4 className="text-[13px] font-[500]">T-Shirt</h4>
						<p className="flex items-center gap-5">
							<span>
								Qty : <span> 2</span>
							</span>{" "}
							<span className="text-[#ff5151] font-bold">price : $25</span>
						</p>
						<Button className="!absolute !top-[2px] !right-[2px] rounded-full !w-[22px] !min-w-[22px] !h-[22px]  !bg-[#f1f1f1] !text-black !p-0">
							<MdDeleteOutline className="text-[#ff5151] text-[18px] " />
						</Button>
					</div>
				</div>
			</div>

			<div className="bottomSec absolute bottom-[10px] left-[10px] w-[95%] !overflow-hidden ">
				<div className="bottomInfo py-3 mt-1 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
					<br />
					<div className="flex items-center justify-between w-full">
						<span className="text-black font-[500]">1 item</span>
						<span className="text-[#ff5151] font-bold">$25.00</span>
					</div>
					<div className="flex items-center justify-between w-full">
						<span className="text-black font-[500]">Shipping</span>
						<span className="text-[#ff5151] font-bold">$7.00</span>
					</div>
				</div>

				<div className="bottomInfo py-3 my-2 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
					<div className="flex items-center justify-between w-full">
						<span className="text-black font-[500]">Total (tax excl)</span>
						<span className="text-[#ff5151] font-bold">$32.00</span>
					</div>
					<div className="flex items-center justify-between w-full">
						<span className="text-black font-[500]">Total (tax incl)</span>
						<span className="text-[#ff5151] font-bold">$32.00</span>
					</div>
					<div className="flex items-center justify-between w-full">
						<span className="text-black font-[500]">Taxes</span>
						<span className="text-[#ff5151] font-bold">$0.00</span>
					</div>
				</div>

				<div className="flex items-center justify-center w-full gap-5">
					<Link to="/cart" className="w-[50%] d-block link">
						<Button className="btn-org btn-lg w-full ">VIEW CART</Button>
					</Link>
					<Link to="/checkout" className="w-[50%] d-block link">
						<Button className="btn-org btn-lg w-full ">CHECKOUT</Button>
					</Link>
				</div>
			</div>
		</>
	);
}

export default CartPanel;
