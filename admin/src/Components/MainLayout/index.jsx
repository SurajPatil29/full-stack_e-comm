import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function MainLayout() {
	const { isSidebarOpen } = useContext(MyContext);

	return (
		<section className="main">
			<Header />
			<div className="contentMain flex">
				<div
					className={`sidebarWrapper ${
						isSidebarOpen ? "w-[18%]" : "w-[0%]"
					} transition-all duration-300 overflow-hidden`}
				>
					{isSidebarOpen && <Sidebar />}
				</div>
				<div
					className={`contentRight py-4 px-5 ${
						isSidebarOpen ? "w-[82%]" : "w-[100%]"
					} transition-all duration-300 overflow-hidden`}
				>
					<Outlet />
				</div>
			</div>
		</section>
	);
}
