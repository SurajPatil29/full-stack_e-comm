import { Link } from "react-router-dom";
import "../ProductItem/style.css";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

function ProductItemListView({ item }) {
	// this componant use for shocase product info on home page
	const { setOpenProductDetailsModel } = useContext(MyContext);
	// Fallback images (if no images found)
	const mainImg = item?.images?.[0] ?? "/placeholder.jpg";
	const hoverImg = item?.images?.[1] ?? item?.images?.[0] ?? "/placeholder.jpg";

	// Calculate discount dynamically
	const oldPrice = item?.oldPrice || 0;
	const newPrice = item?.price || 0;
	const discount =
		oldPrice > 0 ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

	return (
		<div className="productItem shadow-md rounded-md overflow-hidden border-2 border-[rgba(0,0,0,0.1)] flex items-center">
			{/* this div contain image , title of product, info of product rating in star, price   */}
			<div className="group imgWrapper w-[25%] overflow-hidden rounded-md relative">
				<Link to={`/productDetails/${item?._id}`}>
					<div className="relative h-[220px] w-full overflow-hidden bg-gray-100 rounded-md group">
						{/* MAIN IMAGE */}
						<img
							src={mainImg}
							alt={item.name}
							className="w-full h-full object-contain transition-all duration-500 group-hover:opacity-0
    "
						/>

						{/* HOVER IMAGE */}
						<img
							src={hoverImg}
							alt={item.name}
							className="absolute inset-0 w-full h-full object-contain opacity-0 transition-all duration-500 group-hover:opacity-100
    "
						/>
					</div>
				</Link>
				<span className="discount flex items-center absolute top-[10px] left-[10px] z-auto bg-[#ff5151] text-white rounded-lg p-1 text-[10px] font-[500]">
					{/* this use for show discount on image */}
					{discount}
				</span>
				<div className="actions absolute top-[-200px] right-[1px] z-50 flex items-center gap-4 flex-col w-[80px] transition-all duration-700 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
					{/* 3 icons favorit, compair, cart when hover it show the icons */}
					<Tooltip title="View" placement="left-start">
						<Button
							onClick={() =>
								setOpenProductDetailsModel({
									open: true,
									item: item,
								})
							}
							className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5151] hover:text-white group "
						>
							<MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:!text-white " />
						</Button>
					</Tooltip>

					<Tooltip title="Favourite" placement="left-start">
						<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5151] hover:text-white group ">
							<FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white " />
						</Button>
					</Tooltip>

					<Tooltip title="Compair" placement="left-start">
						<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5151] hover:text-white group ">
							<IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white hover:!text-white " />
						</Button>
					</Tooltip>
				</div>
			</div>

			<div className="info px-4 w-[75%] py-4 ">
				{/* info about product */}
				<h5 className="text-[15px] !font-[400]">
					<Link
						to={`/productDetails/${item?._id}`}
						className="link transition-all"
					>
						{item?.brand || "Brand"}
					</Link>
				</h5>
				<h2 className="text-[18px] title my-3 font-[500] text-[rgba(0,0,0)]  ">
					<Link
						to={`/productDetails/${item?._id}`}
						className="link transition-all"
					>
						{item.name}
					</Link>
				</h2>
				<div dangerouslySetInnerHTML={{ __html: item.description }} />
				<Rating
					name="read-only"
					value={item?.rating || 0}
					size="small"
					readOnly
				/>
				<div className="flex items-center gap-4">
					{oldPrice > newPrice && (
						<span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
							₹{oldPrice.toLocaleString()}
						</span>
					)}
					<span className="newPrice text-[#ff5151] text-[15px] font-[600]">
						₹{newPrice.toLocaleString()}
					</span>
				</div>
				<div className="mt-3">
					<Button className="btn-org gap-1">
						{" "}
						<HiOutlineShoppingCart className="text-[20px] " /> Add to Cart
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ProductItemListView;
