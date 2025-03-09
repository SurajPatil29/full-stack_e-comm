import AccountSideBar from "../../componants/AccountSideBar";
import MyListItems from "./MyListItems";

function MyList() {
	return (
		<section className="section py-10 ">
			<div className="container  min-w-[80%] flex gap-5">
				<div className="col1 w-[20%] ">
					<AccountSideBar />
				</div>
				<div className="leftPart w-[80%] m-auto">
					<div className="shadow-md rounded-md  bg-white">
						<div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)] ">
							<h2>My List</h2>
							<p className="mt-0">
								There are <span className="font-bold text-[#ff5151]">2</span>{" "}
								products in your My List
							</p>
						</div>
						<MyListItems />
						<MyListItems />
						<MyListItems />
						<MyListItems />
						<MyListItems />
						<MyListItems />
						<MyListItems />
						<MyListItems />
						<MyListItems />
						<MyListItems />
						<MyListItems />
					</div>
				</div>
			</div>
		</section>
	);
}

export default MyList;
