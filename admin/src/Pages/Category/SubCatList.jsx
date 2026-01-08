import React, { useContext, useEffect, useState, useCallback } from "react";
import {
	Button,
	Checkbox,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
	IconButton,
} from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { PiExport } from "react-icons/pi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import MyContext from "../../context/MyContext";
import { deleteData, fetchDataFromApi, deleteMultiple } from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
	{ id: "image", label: "CATEGORY IMAGE", minWidth: 150 },
	{ id: "catName", label: "CATEGORY NAME", minWidth: 200 },
	{ id: "subCatName", label: "SUB & THIRD-LEVEL CATEGORIES", minWidth: 400 },
];

// 🔹 NestedCategories Component
const NestedCategories = ({ children = [], onDeleteSub, onDeleteThird }) => {
	const [expanded, setExpanded] = useState({});

	const toggleExpand = (id) => {
		setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	return children.map((subCat) => (
		<div key={subCat._id} className="flex flex-col gap-2">
			{/* Subcategory row */}
			<div className="flex items-center justify-between bg-[#f7f9fc] px-3 py-2 rounded-md border">
				<div className="flex items-center gap-2">
					<IconButton size="small" onClick={() => toggleExpand(subCat._id)}>
						{expanded[subCat._id] ? (
							<IoIosArrowDown className="text-[18px]" />
						) : (
							<IoIosArrowForward className="text-[18px]" />
						)}
					</IconButton>

					<span className="font-medium text-sm text-[#1c3f91]">
						{subCat.name}
					</span>
				</div>

				<Tooltip title="Delete Sub Category">
					<IconButton
						size="small"
						onClick={() => onDeleteSub(subCat._id)}
						className="hover:bg-red-100"
					>
						<MdOutlineDelete className="text-[16px] text-red-600" />
					</IconButton>
				</Tooltip>
			</div>

			{/* Third-level list */}
			{expanded[subCat._id] && (
				<div className="ml-8 mt-2 flex flex-wrap gap-2">
					{subCat.children?.map((third) => (
						<div
							key={third._id}
							className="flex items-center gap-1 bg-[#e3e9f9] text-[#1c3f91] px-2 py-1 rounded-full text-[12px]"
						>
							{third.name}
							<Tooltip title="Delete Third Category">
								<IconButton
									size="small"
									onClick={() => onDeleteThird(third._id)}
									className="!p-0 hover:bg-red-100"
								>
									<MdOutlineDelete className="text-[14px] text-red-500" />
								</IconButton>
							</Tooltip>
						</div>
					))}
				</div>
			)}
		</div>
	));
};

function SubCatList() {
	const context = useContext(MyContext);

	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [catData, setCatData] = useState([]);

	// 🔹 Fetch categories
	const getCategories = useCallback(async () => {
		try {
			const res = await fetchDataFromApi("/api/category/categories");
			if (res?.success && Array.isArray(res.data)) {
				setCatData(res.data);
			} else {
				console.warn("Categories not found", res);
			}
		} catch (error) {
			console.error("Failed to fetch Categories", error);
		}
	}, []);

	useEffect(() => {
		getCategories();
	}, [getCategories, context.isOpenFullScreenPanel.open]);

	// 🔹 Delete Single Sub Category
	const handleDeleteSub = async (id) => {
		if (!id || !window.confirm("Delete this subcategory?")) return;
		const res = await deleteData(`/api/category/${id}`);
		if (res.success) {
			getCategories();
		} else {
			alert(res.message || "Failed to delete subcategory");
		}
	};

	// 🔹 Delete Single Third Category
	const handleDeleteThird = async (id) => {
		if (!id || !window.confirm("Delete this third-level category?")) return;
		const res = await deleteData(`/api/category/${id}`);
		if (res.success) {
			getCategories();
		} else {
			alert(res.message || "Failed to delete third category");
		}
	};

	// 🔹 Multi Delete Subcategories
	const handleDeleteSelected = async () => {
		if (selected.length === 0) return;
		if (!window.confirm(`Delete ${selected.length} selected subcategories?`))
			return;

		try {
			const res = await deleteMultiple(`/api/category/deleteMultiCat`, {
				ids: selected,
			});

			if (res.success) {
				setCatData((prev) => prev.filter((cat) => !selected.includes(cat._id)));
				setSelected([]);
				alert("Selected subcategories deleted successfully!");
			} else {
				alert(res.message || "Failed to delete selected subcategories");
			}
		} catch (err) {
			console.error("Error deleting subcategories:", err);
			alert("Error deleting subcategories");
		}
	};

	// 🔹 Selection Handlers
	const handleSelect = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
		);
	};

	const handleSelectAll = (e) => {
		setSelected(e.target.checked ? catData.map((cat) => cat._id) : []);
	};

	return (
		<>
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-2 py-2 gap-3">
				<h2 className="text-[16px] sm:text-[18px] font-[600]">
					Sub Category List
				</h2>

				<div className="flex flex-col sm:flex-row sm:ml-auto w-full sm:w-auto items-stretch sm:items-center gap-2 sm:gap-3">
					{/* ✅ Delete Selected Button (only shows if selected) */}
					{selected.length > 0 && (
						<Button
							onClick={handleDeleteSelected}
							className="btn-sm !bg-red-600 !text-white gap-2 flex items-center justify-center"
						>
							<MdOutlineDelete className="text-white text-[20px]" />
							Delete Selected ({selected.length})
						</Button>
					)}

					<Button
						className="btn-blue btn-sm !text-white gap-2 flex items-center justify-center"
						onClick={() =>
							context.setIsOpenFullScreenPanel({
								open: true,
								model: "Add New Sub Category",
							})
						}
					>
						<TfiLayoutSliderAlt className="text-white text-[20px]" />
						Add New Sub Category
					</Button>
				</div>
			</div>

			{/* Table */}
			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
				<div className="overflow-x-auto">
					<TableContainer sx={{ minWidth: 900, maxHeight: 440 }}>
						<Table stickyHeader>
							<TableHead>
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
									{columns.map((col) => (
										<TableCell key={col.id} width={col.minWidth}>
											{col.label}
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

											<TableCell width={150}>
												<img
													src={cat.images?.[0] || "/no-image.png"}
													alt={cat.name}
													className="w-[80px] h-[60px] object-cover rounded-md"
												/>
											</TableCell>

											<TableCell width={200}>
												<Chip label={cat.name} />
											</TableCell>

											<TableCell width={400}>
												<NestedCategories
													children={cat.children}
													onDeleteSub={handleDeleteSub}
													onDeleteThird={handleDeleteThird}
												/>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>

				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={catData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={(e, newPage) => setPage(newPage)}
					onRowsPerPageChange={(e) => {
						setRowsPerPage(+e.target.value);
						setPage(0);
					}}
					sx={{
						"& .MuiTablePagination-toolbar": {
							flexWrap: "wrap",
						},
					}}
				/>
			</div>
		</>
	);
}

export default SubCatList;
