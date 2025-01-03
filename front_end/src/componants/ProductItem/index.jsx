import { Link } from "react-router-dom";
import "../ProductItem/style.css";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

function ProductItem() {
	// this componant use for shocase product info on home page
	return (
		<div className="productItem shadow-md rounded-md overflow-hidden border-2 border-[rgba(0,0,0,0.1)]">
			{/* this div contain image , title of product, info of product rating in star, price   */}
			<div className="group imgWrapper w-[100%] overflow-hidden rounded-md relative">
				<Link to="/">
					<div className="img h-[220px] overflow-hidden">
						{/* 2 image change when hover */}
						<img
							src="https://api.spicezgold.com/download/file_1734528821892_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg"
							alt="fashion"
							className="w-full"
						/>

						<img
							src="https://api.spicezgold.com/download/file_1734528821890_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
							alt="fashion"
							className="w-full transition-all duration-500 absolute top-0 left-0 opacity-0 group-hover:opacity-100"
						/>
					</div>
				</Link>
				<span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff5151] text-white rounded-lg p-1 text-[10px] font-[500]">
					{/* this use for show discount on image */}
					10%
				</span>
				<div className="actions absolute top-[-200px] right-[1px] z-50 flex items-center gap-4 flex-col w-[80px] transition-all duration-700 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
					{/* 3 icons favorit, compair, cart when hover it show the icons */}
					<Tooltip title="View" placement="left-start">
						<Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5151] hover:text-white group ">
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

			<div className="info p-3 py-4 bg-[#f8f6f6]">
				{/* info about product */}
				<h5 className="text-[14px] !font-[400]">
					<Link to="/" className="link transition-all ">
						Soylent Green
					</Link>
				</h5>
				<h2 className="text-[15px] title mt-1 font-[500] text-[rgba(0,0,0)] mb-1 ">
					<Link to="/" className="link transition-all">
						Siril Georgette Pink Color Saree with Blouse piece
					</Link>
				</h2>
				<Rating name="read-only" value={3.5} size="small" readOnly />

				<div className="flex items-center gap-4">
					<span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
						$58.00
					</span>
					<span className="newPrice  text-[#ff5151] text-[15px] font-[600]">
						$50.00
					</span>
				</div>
			</div>
		</div>
	);
}

export default ProductItem;
