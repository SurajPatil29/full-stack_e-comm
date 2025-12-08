import { useContext, useEffect, useState } from "react";
import AccountSideBar from "../../componants/AccountSideBar";
import MyListItems from "./MyListItems";
import MyContext from "../../context/MyContext";
import MyListItemSkeleton from "./MyListItemSkeleton";
import { AiOutlineHeart } from "react-icons/ai";

function MyList() {
	const context = useContext(MyContext);

	const [localLoading, setLocalLoading] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);

		setLocalLoading(true);
		const timer = setTimeout(() => {
			setLocalLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);
	return (
		<section className="section py-10 ">
			<div className="container  min-w-[80%] flex gap-5">
				<div className="col1 w-[20%] ">
					<AccountSideBar />
				</div>
				<div className="leftPart w-[80%]">
					<div className="shadow-md rounded-md  bg-white">
						<div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)] ">
							<h2>My List</h2>
							<p className="mt-0">
								There are{" "}
								<span className="font-bold text-[#ff5151]">
									{context?.myListData?.length}
								</span>{" "}
								products in your My List
							</p>
						</div>
						{localLoading ? (
							<>
								<MyListItemSkeleton />
								<MyListItemSkeleton />
								<MyListItemSkeleton />
							</>
						) : context?.myListData?.length > 0 ? (
							context.myListData.map((item, i) => (
								<MyListItems data={item} key={i} />
							))
						) : (
							<div className="w-full py-10 flex flex-col items-center justify-center text-center">
								<AiOutlineHeart className="text-[60px] text-gray-400 mb-4" />
								<h3 className="text-lg font-semibold text-gray-700">
									Your My List is Empty
								</h3>
								<p className="text-gray-500 mt-1">
									Start adding items to your wishlist.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default MyList;
