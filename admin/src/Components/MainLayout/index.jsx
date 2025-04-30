import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function MainLayout() {
	const { isSidebarOpen } = useContext(MyContext);
	const [showSidebar, setShowSidebar] = useState(false);

	useEffect(() => {
		let timeoutId;

		if (isSidebarOpen) {
			// Mount sidebar after delay (for smooth width transition)
			timeoutId = setTimeout(() => setShowSidebar(true), 300);
		} else {
			// Instantly unmount sidebar to avoid overlap
			setShowSidebar(false);
		}

		return () => clearTimeout(timeoutId);
	}, [isSidebarOpen]);

	return (
		<section className="main">
			<Header />
			<div className="contentMain flex">
				<div
					className={`sidebarWrapper ${
						isSidebarOpen ? "w-[18%]" : "w-[0%]"
					} transition-all duration-300 overflow-hidden`}
				>
					{showSidebar && <Sidebar />}
				</div>
				<div
					className={`contentRight py-4 px-5 ${
						isSidebarOpen ? "w-[82%]" : "w-[100%]"
					} transition-all duration-300 `}
				>
					<Outlet />
				</div>
			</div>
		</section>
	);
}
