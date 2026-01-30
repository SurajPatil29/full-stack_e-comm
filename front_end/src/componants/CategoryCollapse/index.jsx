import { Button } from "@mui/material";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Link } from "react-router-dom";

function CategoryCollapse({ data }) {
	const [openMenu, setOpenMenu] = useState(null);
	const [openSubMenu, setOpenSubMenu] = useState(null);

	const toggleMenu = (i) => {
		setOpenMenu(openMenu === i ? null : i);
		setOpenSubMenu(null);
	};

	const toggleSub = (i) => {
		setOpenSubMenu(openSubMenu === i ? null : i);
	};

	return (
		<div className="w-full overflow-y-auto py-4 pr-2">
			<ul className="w-full space-y-2">
				{data.map((cat, i) => (
					<li key={cat._id} className="relative">
						{/* Main Category Button */}
						<div
							className="flex justify-between items-center px-3 py-3 cursor-pointer
							 bg-white hover:bg-gray-100 rounded-md shadow-sm border 
							 transition-all duration-200"
						>
							<Link to={`/productListing/cat/${cat._id}`}>
								<span className="font-medium text-[15px] text-gray-800">
									{cat.name}
								</span>
							</Link>

							<div
								className="transition-transform duration-300"
								onClick={() => toggleMenu(i)}
							>
								{openMenu === i ? (
									<AiOutlineMinus className="text-gray-600" />
								) : (
									<AiOutlinePlus className="text-gray-600" />
								)}
							</div>
						</div>

						{/* Submenu (Second level) */}
						{openMenu === i && cat.children?.length > 0 && (
							<ul
								className="ml-3 mt-2 border-l border-gray-300 pl-3 space-y-2
								 transition-all duration-300"
							>
								{cat.children.map((sub, j) => (
									<li key={sub._id} className="relative">
										<div
											className="flex justify-between items-center py-2 cursor-pointer
											 hover:bg-gray-100 rounded px-2 transition"
										>
											<Link to={`/productListing/sub/${sub._id}`}>
												<span className="text-[14px] text-gray-700 font-normal">
													{sub.name}
												</span>
											</Link>

											{sub.children?.length > 0 && (
												<div
													className="transition-transform duration-300"
													onClick={() => toggleSub(j)}
												>
													{openSubMenu === j ? (
														<AiOutlineMinus className="text-gray-600" />
													) : (
														<AiOutlinePlus className="text-gray-600" />
													)}
												</div>
											)}
										</div>

										{/* Third level */}
										{openSubMenu === j && sub.children?.length > 0 && (
											<ul className="ml-4 border-l border-gray-200 pl-3 space-y-1">
												{sub.children.map((inner) => (
													<li key={inner._id}>
														<Link
															to={`/productListing/third/${inner._id}`}
															className="block py-1 text-[14px] text-gray-600 hover:text-primary hover:font-medium transition"
														>
															{inner.name}
														</Link>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default CategoryCollapse;
