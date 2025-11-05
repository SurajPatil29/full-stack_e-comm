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

function AddWeight() {
	const [name, setName] = useState("");
	const [weights, setWeights] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedIds, setSelectedIds] = useState([]);
	const [selectAll, setSelectAll] = useState(false);
	const [editId, setEditId] = useState(null);
	const [editValue, setEditValue] = useState("");
	const context = useContext(MyContext);

	const getProductWeights = async () => {
		try {
			setLoading(true);
			const res = await fetchDataFromApi("/api/product/getAllProductsWeights");
			setWeights(res?.productWeights || []);
		} catch (error) {
			context.openAlertBox("error", "Failed to fetch Product Weights");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProductWeights();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim())
			return context.openAlertBox("error", "Please enter weight");

		try {
			await postData("/api/product/productWeights/create", { name });
			context.openAlertBox("success", "Weight added successfully");
			setName("");
			getProductWeights();
		} catch (error) {
			context.openAlertBox("error", "Failed to create weight");
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
		setSelectedIds(checked ? weights.map((w) => w._id) : []);
	};

	useEffect(() => {
		setSelectAll(weights.length > 0 && selectedIds.length === weights.length);
	}, [selectedIds, weights]);

	const deleteOne = async (id) => {
		try {
			await deleteData(`/api/product/productWeights/${id}`);
			context.openAlertBox("success", "Deleted successfully");
			getProductWeights();
		} catch {
			context.openAlertBox("error", "Failed to delete weight");
		}
	};

	const deleteMultipleWeights = async () => {
		if (selectedIds.length === 0)
			return context.openAlertBox("error", "No items selected");
		try {
			await deleteMultiple(
				"/api/product/productWeights/deleteMultiple",
				selectedIds
			);
			context.openAlertBox("success", "Selected weights deleted successfully");
			setSelectedIds([]);
			getProductWeights();
		} catch {
			context.openAlertBox("error", "Failed to delete selected weights");
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
			await putData(`/api/product/updateProductWeights/${id}`, {
				name: editValue,
			});
			context.openAlertBox("success", "Weight updated successfully");
			setEditId(null);
			getProductWeights();
		} catch {
			context.openAlertBox("error", "Failed to update weight");
		}
	};

	return (
		<>
			<div className="flex items-center justify-between px-2 py-0 mt-3 w-[65%]">
				<h2 className="text-[18px] font-[600]">Add Product Weights</h2>
				{selectedIds.length > 0 && (
					<Button
						onClick={deleteMultipleWeights}
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
							PRODUCT WEIGHT
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
					) : weights.length === 0 ? (
						<p className="text-center text-gray-500 py-6">
							No Product Weights available
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
									<th className="px-0 py-3 w-[60%]">PRODUCT WEIGHT</th>
									<th className="px-6 py-3 w-[30%]">ACTION</th>
								</tr>
							</thead>
							<tbody>
								{weights.map((w) => (
									<tr
										key={w._id}
										className="odd:bg-white even:bg-gray-50 border-b"
									>
										<td className="px-6 pr-0 py-2">
											<Checkbox
												size="small"
												checked={selectedIds.includes(w._id)}
												onChange={() => handleSelect(w._id)}
											/>
										</td>
										<td>
											{editId === w._id ? (
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
														onClick={() => handleSave(w._id)}
													>
														Save
													</Button>
												</div>
											) : (
												w.name
											)}
										</td>
										<td className="px-6 py-2">
											<div className="flex items-center gap-1">
												<Button
													disabled={editId === w._id}
													className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400 !rounded-full"
													onClick={() => handleEdit(w)}
												>
													<AiOutlineEdit className="text-[20px]" />
												</Button>
												<Button
													className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400 !rounded-full"
													onClick={() => deleteOne(w._id)}
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

export default AddWeight;
