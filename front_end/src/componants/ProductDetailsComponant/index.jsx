import { Button, Rating } from "@mui/material";
import { useState } from "react";
import QtyBox from "../QtyBox";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";

function ProductDetailsComponant() {
	const [productActionIndex, setProductActionIndex] = useState(null);
	return (
		<>
			<h1 className="text-[24px] font-[600] mb-2 ">ChikanKari Women Kurta</h1>
			<div className="flex items-center gap-3">
				<span className="text-gray-400 text-[13px] ">
					Brands :{" "}
					<span className="font-[500] text-black opacity-75">
						House of Chikankari
					</span>
				</span>
				<Rating name="size-small" defaultValue={4} size="small" readOnly />
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
				dignissimos in quibusdam, ratione sit rem? Doloremque iste dicta nemo
				eveniet quibusdam cum adipisci vel veritatis quos distinctio non
				obcaecati, deleniti quaerat numquam alias autem commodi? Sit earum culpa
				impedit velit molestias distinctio voluptatum nihil, illo enim numquam
				id consectetur odio facere alias explicabo amet, optio iusto repellendus
				reprehenderit ratione iure? Nulla placeat suscipit deleniti ipsa vel
				magni dignissimos consectetur dicta!
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
		</>
	);
}

export default ProductDetailsComponant;
