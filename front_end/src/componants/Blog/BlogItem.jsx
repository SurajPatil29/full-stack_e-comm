import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function BlogItem({ data }) {
	// this componant contain blog box  contain the link , pulish date and information
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
		const year = date.getFullYear();
		return `${day} ${month}, ${year}`;
	};
	return (
		<div className="blogItem bg-white rounded-md overflow-hidden">
			<div className="imgWrapper w-full h-[180px] sm:h-[220px] overflow-hidden rounded-md cursor-pointer relative group">
				<img
					src={data?.images?.[0]}
					alt="blogImg"
					className="
				w-full 
				h-full 
				object-cover 
				transition-all 
				duration-300
				group-hover:scale-105 
				group-hover:rotate-1
			"
				/>

				<span
					className="
				flex items-center gap-1
				text-white
				absolute bottom-3 right-3
				bg-[#ff5151]
				rounded-md
				px-2 py-1
				text-[10px] sm:text-[11px]
				font-[500]
			"
				>
					<IoTimeOutline className="text-[14px]" />
					{formatDate(data?.createdAt)}
				</span>
			</div>

			<div className="info py-3 sm:py-4">
				<h2 className="text-[14px] sm:text-[16px] font-[500] text-black mb-2">
					<Link className="link line-clamp-2">{data.title}</Link>
				</h2>

				<div
					className="description-content text-gray-700 text-[13px] sm:text-[14px] leading-relaxed line-clamp-3"
					dangerouslySetInnerHTML={{
						__html: data.description || "",
					}}
				/>

				<Link
					to="/"
					className="link font-[500] text-[13px] sm:text-[14px] flex items-center gap-1 mt-2"
				>
					Read More
					<IoIosArrowDroprightCircle className="text-[18px]" />
				</Link>
			</div>
		</div>
	);
}

export { BlogItem };
