import { Button, Chip } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { PiExport } from "react-icons/pi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import MyContext from "../../context/MyContext";
import { deleteData, deleteMultiple, fetchDataFromApi } from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
	{ id: "image", label: "IMAGE", minWidth: 150 },
	{ id: "catName", label: "CATEGORY NAME", minWidth: 150 },
	{ id: "action", label: "ACTION", minWidth: 100 },
];

function CategoryList() {
	const context = useContext(MyContext);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [catData, setCatData] = useState([]);

	const handleChangePage = (event, newPage) => setPage(newPage);
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// ✅ Single delete
	const handleDeleteCategory = async (id) => {
		if (!id) return;
		if (!window.confirm("Are you sure you want to delete this category?"))
			return;
		const res = await deleteData(`/api/category/${id}`);
		if (res.success) {
			setCatData((prev) => prev.filter((cat) => cat._id !== id));
			setSelected((prev) => prev.filter((sid) => sid !== id));
		} else {
			alert(res.message || "Failed to delete category");
		}
	};

	// ✅ Multi delete
	const handleDeleteSelected = async () => {
		if (selected.length === 0) return;
		if (!window.confirm(`Delete ${selected.length} selected categories?`))
			return;

		try {
			// Just pass the data; your helper handles headers, token, etc.
			const res = await deleteMultiple(`/api/category/deleteMultiCat`, {
				ids: selected,
			});

			if (res.success) {
				setCatData((prev) => prev.filter((cat) => !selected.includes(cat._id)));
				setSelected([]);
				alert("Selected categories deleted successfully!");
			} else {
				alert(res.message || "Failed to delete selected categories");
			}
		} catch (err) {
			console.error("Error deleting categories:", err);
			alert("Error deleting categories");
		}
	};

	// ✅ Select toggles
	const handleSelect = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
		);
	};

	const handleSelectAll = (event) => {
		if (event.target.checked) {
			setSelected(catData.map((cat) => cat._id));
		} else {
			setSelected([]);
		}
	};

	// ✅ Fetch categories
	const getCategories = async () => {
		try {
			const res = await fetchDataFromApi("/api/category/categories");
			if (res?.success && Array.isArray(res.data)) {
				setCatData(res.data);
			} else {
				console.warn("Categories not found", res);
			}
		} catch (err) {
			console.error("Failed to fetch categories", err);
		}
	};

	useEffect(() => {
		getCategories();
	}, [context.isOpenFullScreenPanel.open]);

	return (
		<>
			<div className="flex items-center justify-between px-2 py-0 ">
				<h2 className="text-[18px] font-[600]">Category List</h2>

				<div className="col w-[40%] ml-auto flex items-center justify-end gap-3">
					{/* ✅ Show Delete Selected only when some selected */}
					{selected.length > 0 && (
						<Button
							className="btn-sm !bg-red-600 !text-white gap-2 flex items-center"
							onClick={handleDeleteSelected}
						>
							<MdOutlineDelete className="text-white text-[20px]" />
							Delete Selected ({selected.length})
						</Button>
					)}

					<Button className="btn-sm !bg-green-600 !text-white gap-2 flex items-center">
						<PiExport className="text-white text-[20px]" />
						Export
					</Button>

					<Button
						className="btn-blue btn-sm !text-white gap-2 flex items-center"
						onClick={() =>
							context.setIsOpenFullScreenPanel({
								open: true,
								model: "Add New Category",
							})
						}
					>
						<TfiLayoutSliderAlt className="text-white text-[20px]" />
						Add New Category
					</Button>
				</div>
			</div>

			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white ">
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead className="!bg-gray-50">
							<TableRow>
								<TableCell width={50} align="center">
									<Checkbox
										{...label}
										size="small"
										indeterminate={
											selected.length > 0 && selected.length < catData.length
										}
										checked={
											catData.length > 0 && selected.length === catData.length
										}
										onChange={handleSelectAll}
									/>
								</TableCell>

								{columns.map((column) => (
									<TableCell
										width={column.minWidth}
										key={column.id}
										align={column.align}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{catData
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((cat) => (
									<TableRow key={cat._id}>
										<TableCell width={50} align="center">
											<Checkbox
												{...label}
												size="small"
												checked={selected.includes(cat._id)}
												onChange={() => handleSelect(cat._id)}
											/>
										</TableCell>
										<TableCell width={100}>
											<div className="w-[80px] flex items-center gap-4">
												<div className="img w-full rounded-md overflow-hidden group">
													<img
														src={cat.images?.[0] || "/placeholder.png"}
														alt={cat.name}
														className="w-full group-hover:scale-105 transition-all"
													/>
												</div>
											</div>
										</TableCell>
										<TableCell width={100}>
											<Chip label={cat.name} />
										</TableCell>
										<TableCell width={100}>
											<div className="flex items-center gap-2">
												<Tooltip title="Edit Category" placement="top">
													<Button
														className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)]"
														onClick={() =>
															context.setIsOpenFullScreenPanel({
																open: true,
																model: "Edit Category",
																id: cat?._id,
															})
														}
													>
														<AiOutlineEdit className="text-[18px] text-[rgba(0,0,0,0.8)]" />
													</Button>
												</Tooltip>
												<Tooltip title="Delete Category" placement="top">
													<Button
														className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.05)]"
														onClick={() => handleDeleteCategory(cat._id)}
													>
														<MdOutlineDelete className="text-[18px] text-[rgba(0,0,0,0.8)]" />
													</Button>
												</Tooltip>
											</div>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={catData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
		</>
	);
}

export default CategoryList;
