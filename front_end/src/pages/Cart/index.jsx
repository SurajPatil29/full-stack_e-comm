import { Button } from "@mui/material";
import { BsBagCheck } from "react-icons/bs";

import CartItems from "./CartItems";

function CartPage() {
	return (
		<section className="section py-10 px-5">
			<div className="container w-[80%] min-w-[80%] flex gap-5">
				<div className="leftPart w-[70%]">
					<div className="shadow-md rounded-md  bg-white">
						<div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)] ">
							<h2>Your Cart</h2>
							<p className="mt-0">
								There are <span className="font-bold text-[#ff5151]">2</span>{" "}
								products in your cart
							</p>
						</div>
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
						<CartItems size="S" qty={1} />
					</div>
				</div>

				<div className="rightPart w-[30%] ">
					<div className="shadow-md rounded-md bg-white p-5">
						<h3>Cart Total</h3>
						<hr />

						<p className="flex items-center justify-between">
							<span className="text-[14px] font-[500] ">Subtotal</span>
							<span className="text-[#ff5151] font-bold ">$300</span>
						</p>

						<p className="flex items-center justify-between">
							<span className="text-[14px] font-[500] ">Shipping</span>
							<span className=" font-bold ">Free</span>
						</p>

						<p className="flex items-center justify-between">
							<span className="text-[14px] font-[500] ">Estimate for</span>
							<span className=" font-bold ">United Kingdom</span>
						</p>

						<p className="flex items-center justify-between">
							<span className="text-[14px] font-[500] ">Total</span>
							<span className="text-[#ff5151] font-bold ">$900</span>
						</p>
						<Button className="btn-org btn-lg w-full flex gap-3">
							<BsBagCheck className="text-[20px]" /> Checkout
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CartPage;
