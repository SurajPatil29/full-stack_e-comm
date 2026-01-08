import { Button, Checkbox, Switch, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import MyContext from "../../context/MyContext";
import {
	deleteData,
	deleteMultiple,
	fetchDataFromApi,
	putData,
} from "../../utils/api";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// ⭐ NEW COLUMNS (NO TITLE)
const columns = [
	{
		id: "image",
		label: "IMAGE",
		minWidth: { xs: 200, sm: 220, md: 300, lg: 350 },
	},
	{
		id: "isActive",
		label: "ACTIVE",
		minWidth: { xs: 80, sm: 100, md: 120 },
	},
	{
		id: "action",
		label: "ACTION",
		minWidth: { xs: 90, sm: 110, md: 120 },
	},
];

function HomeSliderBanners() {
	const context = useContext(MyContext);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [selected, setSelected] = useState([]);
	const [bannerData, setBannerData] = useState([]);

	// Fetch banners
	const getBanners = async () => {
		const res = await fetchDataFromApi("/api/banner/all");
		if (res?.success) setBannerData(res.data);
	};

	useEffect(() => {
		getBanners();
	}, [context.isOpenFullScreenPanel.open]);

	const handleSelect = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	const handleSelectAll = (e) => {
		if (e.target.checked) setSelected(bannerData.map((b) => b._id));
		else setSelected([]);
	};

	const handleDeleteBanner = async (id) => {
		if (!window.confirm("Delete this banner?")) return;

		const res = await deleteData(`/api/banner/${id}`);
		if (res.success) {
			setBannerData((prev) => prev.filter((b) => b._id !== id));
			alert("Banner deleted successfully!");
		}
	};

	const handleDeleteSelected = async () => {
		if (selected.length === 0) return;
		if (!window.confirm(`Delete ${selected.length} selected banners?`)) return;

		const res = await deleteMultiple(`/api/banner/delete-multiple`, {
			ids: selected,
		});

		if (res.success) {
			setBannerData((prev) => prev.filter((b) => !selected.includes(b._id)));
			setSelected([]);
			alert("Selected banners deleted successfully!");
		}
	};

	// ⭐ Toggle Active Status
	const handleToggleActive = async (id, currentState) => {
		const newState = !currentState;

		setBannerData((prev) =>
			prev.map((b) => (b._id === id ? { ...b, isActive: newState } : b))
		);

		const res = await putData(`/api/banner/${id}`, { isActive: newState });

		if (!res.success) {
			alert("Failed to update status");
			getBanners();
		}
	};

	return (
		<>
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-2 py-2 gap-3">
				<h2 className="text-[16px] sm:text-[18px] font-[600]">
					Home Slider Banners
				</h2>

				<div className="flex flex-col sm:flex-row sm:ml-auto items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
					<Button
						className="btn-blue btn-sm !text-white gap-2 flex items-center justify-center sm:justify-start"
						onClick={() =>
							context.setIsOpenFullScreenPanel({
								open: true,
								model: "Add Home Slide",
							})
						}
					>
						<TfiLayoutSliderAlt className="text-white text-[18px] sm:text-[20px]" />
						Add Home Slide
					</Button>

					<Button
						className="!bg-red-600 !text-white btn-sm"
						onClick={handleDeleteSelected}
						disabled={selected.length === 0}
					>
						Delete Selected ({selected.length})
					</Button>
				</div>
			</div>

			{/* Table */}
			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
				<div className="relative overflow-x-auto">
					<TableContainer
						sx={{
							maxHeight: 440,
							minWidth: { xs: "100%", md: 900 },
						}}
					>
						<Table stickyHeader>
							<TableHead className="!bg-gray-50">
								<TableRow>
									<TableCell
										sx={{
											padding: {
												xs: "6px 8px",
												sm: "10px 12px",
												md: "14px 16px",
											},
											whiteSpace: "nowrap",
										}}
										width={60}
										className="hidden sm:table-cell"
									>
										<Checkbox
											{...label}
											size="small"
											checked={
												selected.length === bannerData.length &&
												bannerData.length > 0
											}
											onChange={handleSelectAll}
										/>
									</TableCell>

									{columns.map((col) => (
										<TableCell
											key={col.id}
											sx={{
												minWidth: col.minWidth, // ✅ responsive works here
												padding: {
													xs: "6px 8px",
													sm: "10px 12px",
													md: "14px 16px",
												},
												whiteSpace: "nowrap",
											}}
										>
											{col.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody>
								{bannerData.length === 0 ? (
									<TableRow>
										<TableCell colSpan={6} align="center">
											No banners found.
										</TableCell>
									</TableRow>
								) : (
									bannerData
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((banner) => (
											<TableRow key={banner._id} hover>
												<TableCell
													sx={{
														padding: {
															xs: "6px 8px",
															sm: "10px 12px",
															md: "14px 16px",
														},
														whiteSpace: "nowrap",
													}}
													width={60}
													className="hidden sm:table-cell"
												>
													<Checkbox
														{...label}
														size="small"
														checked={selected.includes(banner._id)}
														onChange={() => handleSelect(banner._id)}
													/>
												</TableCell>

												{/* ⭐ BIGGER IMAGE */}
												<TableCell
													sx={{
														minWidth: columns[0].minWidth,
														padding: {
															xs: "6px 8px",
															sm: "10px 12px",
															md: "14px 16px",
														},
													}}
												>
													<img
														src={banner.images?.[0] || "/no-image.png"}
														alt="banner"
														className="
			w-[180px] h-[90px]
			sm:w-[260px] sm:h-[120px]
			lg:w-[350px] lg:h-[160px]
			object-cover rounded-md
		"
													/>
												</TableCell>

												{/* ⭐ ACTIVE SWITCH */}
												<TableCell
													sx={{
														minWidth: columns[1].minWidth,
														padding: {
															xs: "6px 8px",
															sm: "10px 12px",
															md: "14px 16px",
														},
													}}
												>
													<Switch
														checked={banner.isActive}
														onChange={() =>
															handleToggleActive(banner._id, banner.isActive)
														}
													/>
												</TableCell>

												{/* ⭐ ACTION BUTTONS */}
												<TableCell
													sx={{
														minWidth: columns[2].minWidth,
														padding: {
															xs: "6px 8px",
															sm: "10px 12px",
															md: "14px 16px",
														},
													}}
												>
													<div className="flex items-center gap-2 whitespace-nowrap">
														<Tooltip title="Edit Banner" placement="top">
															<Button
																className="!w-[35px] !h-[35px] rounded-full bg-[#f1f1f1]"
																onClick={() =>
																	context.setIsOpenFullScreenPanel({
																		open: true,
																		model: "Edit Banner",
																		id: banner._id,
																	})
																}
															>
																<AiOutlineEdit className="text-[18px]" />
															</Button>
														</Tooltip>

														<Tooltip title="Delete Banner" placement="top">
															<Button
																className="!w-[35px] !h-[35px] rounded-full bg-[#f1f1f1]"
																onClick={() => handleDeleteBanner(banner._id)}
															>
																<MdOutlineDelete className="text-[18px]" />
															</Button>
														</Tooltip>
													</div>
												</TableCell>
											</TableRow>
										))
								)}
							</TableBody>
						</Table>
					</TableContainer>

					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component="div"
						count={bannerData.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={(e, newPage) => setPage(newPage)}
						onRowsPerPageChange={(e) => {
							setRowsPerPage(+e.target.value);
							setPage(0);
						}}
					/>
				</div>
			</div>
		</>
	);
}

export default HomeSliderBanners;
