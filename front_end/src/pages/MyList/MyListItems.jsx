import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, Rating } from "@mui/material";

function MyListItems() {
	return (
		<div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.2)] ">
			<div className="img w-[15%] group border border-[rgba(0,0,0,0.2)] rounded-md">
				<Link to="productDetails/123">
					<img
						src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/53-home_default/today-is-a-good-day-framed-poster.jpg"
						alt="CartItem Img"
						className="w-full rounded-md group-hover:scale-105 transition-all"
					/>
				</Link>
			</div>
			<div className="info w-[85%] relative">
				<IoMdClose className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all " />
				<span className="text-[13px] ">Sangria</span>
				<h3 className="tetx-[15px] ">
					<Link to="productDetails/123" className="link">
						A-Line Kruti with Sharara & Dupatta
					</Link>
				</h3>

				<Rating name="size-small" defaultValue={4} size="small" readOnly />

				<div className="flex items-center gap-4 mt-2 mb-2 ">
					<span className="pprice  text[14px] font-[600] ">$49.00</span>
					<span className="oldPrice line-through text-gray-500 text-[14px] font[500] ">
						$58.00
					</span>

					<span className="pprice text-[#ff5151] text[12px] font-[500] ">
						20% OFF
					</span>
				</div>

				<br />
				<Button className="btn-org btn-sm ">Add to Cart</Button>
			</div>
		</div>
	);
}

export default MyListItems;
