import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import MyContext from "../../context/MyContext";
import {
	deleteData,
	deleteMultiple,
	fetchDataFromApi,
	postData,
	putData,
} from "../../utils/api";

function AddSize() {
	const [name, setName] = useState("");
	const [sizes, setSizes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedIds, setSelectedIds] = useState([]);
	const [selectAll, setSelectAll] = useState(false);
	const [editId, setEditId] = useState(null);
	const [editValue, setEditValue] = useState("");
	const context = useContext(MyContext);

	const getProductSizes = async () => {
		try {
			setLoading(true);
			const res = await fetchDataFromApi("/api/product/getAllProductsSizes");
			setSizes(res?.productSizes || []);
		} catch {
			context.openAlertBox("error", "Failed to fetch Product Sizes");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProductSizes();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim()) return context.openAlertBox("error", "Please enter size");

		try {
			await postData("/api/product/productSizes/create", { name });
			context.openAlertBox("success", "Size added successfully");
			setName("");
			getProductSizes();
		} catch {
			context.openAlertBox("error", "Failed to create size");
		}
	};

	const handleSelect = (id) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	const handleSelectAll = (e) => {
		const checked = e.target.checked;
		setSelectAll(checked);
		setSelectedIds(checked ? sizes.map((s) => s._id) : []);
	};

	useEffect(() => {
		setSelectAll(sizes.length > 0 && selectedIds.length === sizes.length);
	}, [selectedIds, sizes]);

	const deleteOne = async (id) => {
		try {
			await deleteData(`/api/product/productSizes/${id}`);
			context.openAlertBox("success", "Deleted successfully");
			getProductSizes();
		} catch {
			context.openAlertBox("error", "Failed to delete size");
		}
	};

	const deleteMultipleSizes = async () => {
		if (selectedIds.length === 0)
			return context.openAlertBox("error", "No items selected");
		try {
			await deleteMultiple(
				"/api/product/productSizes/deleteMultiple",
				selectedIds
			);
			context.openAlertBox("success", "Selected sizes deleted successfully");
			setSelectedIds([]);
			getProductSizes();
		} catch {
			context.openAlertBox("error", "Failed to delete selected sizes");
		}
	};

	const handleEdit = (item) => {
		setEditId(item._id);
		setEditValue(item.name);
	};

	const handleSave = async (id) => {
		if (!editValue.trim())
			return context.openAlertBox("error", "Name cannot be empty");
		try {
			await putData(`/api/product/updateProductSizes/${id}`, {
				name: editValue,
			});
			context.openAlertBox("success", "Size updated successfully");
			setEditId(null);
			getProductSizes();
		} catch {
			context.openAlertBox("error", "Failed to update size");
		}
	};

	return (
		<>
			<div className="flex items-center justify-between px-2 py-0 mt-3 w-[65%]">
				<h2 className="text-[18px] font-[600]">Add Product Sizes</h2>
				{selectedIds.length > 0 && (
					<Button
						onClick={deleteMultipleSizes}
						className="!bg-red-600 !text-white hover:!bg-red-700"
					>
						Delete Selected ({selectedIds.length})
					</Button>
				)}
			</div>

			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white w-[65%]">
				<form className="py-3 p-8" onSubmit={handleSubmit}>
					<div className="mb-4">
						<h3 className="text-[14px] font-[500] mb-1 text-black">
							PRODUCT SIZE
						</h3>
						<input
							type="text"
							className="w-full h-[40px] border border-gray-300 focus:outline-none focus:border-gray-500 rounded-sm p-3 text-sm"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<Button type="submit" className="btn-blue w-full flex gap-2">
						<FaCloudUploadAlt className="text-[25px] text-white" />
						Publish and View
					</Button>
				</form>
			</div>

			<div className="card my-4 shadow-md sm:rounded-lg bg-white w-[65%] pb-5">
				<div className="relative overflow-x-auto mt-5">
					{loading ? (
						<div className="flex justify-center py-10">
							<CircularProgress size={30} />
						</div>
					) : sizes.length === 0 ? (
						<p className="text-center text-gray-500 py-6">
							No Product Sizes available
						</p>
					) : (
						<table className="w-full text-sm text-left text-gray-500">
							<thead className="text-xs text-gray-800 uppercase bg-gray-100">
								<tr>
									<th className="px-6 pr-0 py-3 w-[10%]">
										<Checkbox
											size="small"
											checked={selectAll}
											onChange={handleSelectAll}
										/>
									</th>
									<th className="px-0 py-3 w-[60%]">PRODUCT SIZE</th>
									<th className="px-6 py-3 w-[30%]">ACTION</th>
								</tr>
							</thead>
							<tbody>
								{sizes.map((s) => (
									<tr
										key={s._id}
										className="odd:bg-white even:bg-gray-50 border-b"
									>
										<td className="px-6 pr-0 py-2">
											<Checkbox
												size="small"
												checked={selectedIds.includes(s._id)}
												onChange={() => handleSelect(s._id)}
											/>
										</td>
										<td>
											{editId === s._id ? (
												<div className="flex items-center gap-2">
													<input
														type="text"
														className="border border-gray-300 rounded-sm p-1 text-sm"
														value={editValue}
														onChange={(e) => setEditValue(e.target.value)}
													/>
													<Button
														size="small"
														variant="contained"
														className="!bg-blue-600 !text-white !text-xs !py-1 !px-3"
														onClick={() => handleSave(s._id)}
													>
														Save
													</Button>
												</div>
											) : (
												s.name
											)}
										</td>
										<td className="px-6 py-2">
											<div className="flex items-center gap-1">
												<Button
													disabled={editId === s._id}
													className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400 !rounded-full"
													onClick={() => handleEdit(s)}
												>
													<AiOutlineEdit className="text-[20px]" />
												</Button>
												<Button
													className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400 !rounded-full"
													onClick={() => deleteOne(s._id)}
												>
													<MdOutlineDelete className="text-[20px]" />
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</>
	);
}

export default AddSize;
