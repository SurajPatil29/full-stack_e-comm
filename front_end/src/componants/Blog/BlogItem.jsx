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
		<div className="blogItem">
			<div className="imgWrapper w-full h-[220px] overflow-hidden rounded-md cursor-pointer relative group">
				<img
					src={data?.images?.[0]}
					alt="blogImg"
					className="w-full h-full object-cover transition-all group-hover:scale-105 group-hover:rotate-1"
				/>
				<span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-[#ff5151] rounded-md p-1 text-[11px] font-[500] gap-1">
					<IoTimeOutline className="text-[16px]" />{" "}
					{formatDate(data?.createdAt)}
				</span>
			</div>

			<div className="info py-4">
				<h2 className="text-[16px] font-[500] text-black">
					<Link className="link"> {data.title}</Link>
				</h2>
				<div
					className="description-content text-gray-700 leading-relaxed"
					dangerouslySetInnerHTML={{
						__html: (data.description || "").substr(0, 150) + "...",
					}}
				></div>
				<Link to="/" className="link font-[500] flex items-center gap-1">
					Read More <IoIosArrowDroprightCircle className="link" />
				</Link>
			</div>
		</div>
	);
}

export { BlogItem };
