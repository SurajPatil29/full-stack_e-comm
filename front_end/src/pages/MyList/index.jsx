import { useContext, useEffect, useState } from "react";
import AccountSideBar from "../../componants/AccountSideBar";
import MyListItems from "./MyListItems";
import MyContext from "../../context/MyContext";
import MyListItemSkeleton from "./MyListItemSkeleton";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Button } from "@mui/material";

function MyList() {
	const context = useContext(MyContext);

	const [localLoading, setLocalLoading] = useState(true);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);

		setLocalLoading(true);
		const timer = setTimeout(() => {
			setLocalLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	// for closing Accoubntsidebar
	useEffect(() => {
		if (sidebarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => (document.body.style.overflow = "");
	}, [sidebarOpen]);
	return (
		<section className="section py-10 ">
			<div className="container  max-w-7xl mx-auto flex gap-5 px-4">
				<div className="hidden lg:block w-[22%] ">
					<AccountSideBar />
				</div>
				<div className="leftPart w-full lg:w-[78%]">
					<div className="shadow-md rounded-md  bg-white">
						<div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)]">
							{/* Header row */}
							<div className="flex items-center justify-between gap-3">
								<h2 className="text-[18px] font-semibold">My List</h2>

								{/* Mobile menu button */}
								<Button
									onClick={() => setSidebarOpen(true)}
									className="lg:hidden !min-w-[40px] !p-0 !text-[rgba(0,0,0,0.8)]"
								>
									<FiMenu className="text-[22px]" />
								</Button>
							</div>

							{/* Subtitle */}
							<p className="mt-1 text-[14px] text-gray-600">
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

			{/* overlay accountsidebar */}
			{sidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden">
					{/* backdrop */}
					<div
						className="absolute inset-0 bg-black/40"
						onClick={() => setSidebarOpen(false)}
					/>

					{/* drawer */}
					<div className="absolute left-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-lg animate-slide-in">
						<div className="flex justify-between items-center p-4 border-b">
							<h3 className="font-semibold">My Account</h3>
							<button onClick={() => setSidebarOpen(false)}>✕</button>
						</div>

						<AccountSideBar />
					</div>
				</div>
			)}
			{/* overlay accountsidebar */}
		</section>
	);
}

export default MyList;
