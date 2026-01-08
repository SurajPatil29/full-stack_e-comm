import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import MyContext from "../../context/MyContext";

export default function MainLayout() {
	const { isSidebarOpen, setIsSidebarOpen } = useContext(MyContext);
	const [showSidebar, setShowSidebar] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Detect screen size
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1080);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
		<section className="main relative">
			<Header />
			<div className="contentMain flex relative">
				{/* ===== OVERLAY MODE (MOBILE/TABLET) ===== */}
				{isMobile && isSidebarOpen && (
					<div
						className="fixed inset-0 bg-black/40 z-40"
						onClick={() => setIsSidebarOpen(false)}
					/>
				)}

				{/* ===== SIDEBAR ===== */}
				<div
					className={`
						sidebarWrapper
						${
							isMobile
								? `fixed top-0 left-0 h-full z-50
							   ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
							   w-[260px]`
								: `${isSidebarOpen ? "w-[18%]" : "w-[0%]"}`
						}
						bg-white
						transition-all duration-300 ease-in-out
						overflow-hidden
					`}
				>
					{showSidebar && <Sidebar />}
				</div>

				{/* ===== MAIN CONTENT ===== */}
				<div
					className={`
						contentRight
						py-4 px-5
						transition-all duration-300
						${isMobile ? "w-full" : isSidebarOpen ? "w-[82%]" : "w-full"}
					`}
				>
					<Outlet />
				</div>
			</div>
		</section>
	);
}
