import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function BlogItem() {
	return (
		<div className="blogItem">
			<div className="imgWrapper  w-full overflow-hidden rounded-md cursor-pointer relative group">
				<img
					src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/psblog/b/8/1105_813/b-blog-6.jpg"
					alt="blogImg"
					className="w-full transition-all group-hover:scale-105 group-hover:rotate-1"
				/>
				<span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-[#ff5151] rounded-md p-1 text-[11px] font-[500] gap-1">
					<IoTimeOutline className="text-[16px]" /> 5 APRIL, 2023
				</span>
			</div>
			<div className="info py-4">
				<h2 className="text-[16px] font-[500] text-black">
					<Link className="link"> Nullan ullamcorpre ornare molestie</Link>
				</h2>
				<p className="text-[14px] font-[400] text-black mb-4">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque ipsam
					consectetur odit delectus sapiente accusamus facere...
				</p>
				<Link to="/" className="link font-[500] flex items-center gap-1">
					Read More <IoIosArrowDroprightCircle className="link" />
				</Link>
			</div>
		</div>
	);
}

export { BlogItem };
