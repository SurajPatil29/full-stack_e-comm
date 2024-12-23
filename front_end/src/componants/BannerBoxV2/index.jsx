import { Link } from "react-router-dom";

function BannerBoxV2(props) {
	return (
		<div className="bannerBoxV2 w-full overflow-hidden rounded-md group relative">
			<img
				src={props.image}
				alt="sideBan"
				className="w-full transition-all duration-200 group-hover:scale-105"
			/>
			<div
				className={`info p-2 absolute top-0 ${
					props.info === "left" ? "left-0" : "right-0"
				} w-[50%] h-[100%] z-50 flex items-center justify-center flex-col `}
			>
				<h2 className="text-[18px] font-[600] ">Samsung Gear VR Camera</h2>
				<span className="text-[20px] text-[#ff5151] font-[600] w-full ">
					$129.00
				</span>
				<div className="w-full">
					<Link to="/" className="link text-[16px] font-[500] ">
						SHOP NOW
					</Link>
				</div>
			</div>
		</div>
	);
}

export default BannerBoxV2;
