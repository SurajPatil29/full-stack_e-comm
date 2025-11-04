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

function AddRAMs() {
	const [name, setName] = useState();
	const [RAMs, setRAMs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedIds, setSelectedIds] = useState([]); // ✅ store selected IDs
	const [selectAll, setSelectAll] = useState(false);
	const [editId, setEditId] = useState(null);
	const [editValue, setEditValue] = useState("");
	const context = useContext(MyContext);

	const getProductRAMs = async () => {
		try {
			setLoading(true);
			const res = await fetchDataFromApi("/api/product/getAllProductsRAMs");
			setRAMs(res?.productRAMs || []);
			setLoading(false);
		} catch (error) {
			context.openAlertBox("error", "Failed to fetch Product Rams");
			setLoading(false);
		}
	};

	useEffect(() => {
		getProductRAMs();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name.trim()) {
			return context.openAlertBox("error", "Please enter product RAM");
		}

		try {
			await postData("/api/product/productRAMs/create", { name });
			context.openAlertBox("success", "Product RAM added successfully");
			setName("");
			getProductRAMs();
		} catch (error) {
			context.openAlertBox("error", "Failed to create Product RAM");
		}
	};

	const handleSelect = (id) => {
		setSelectedIds((prev) => {
			if (prev.includes(id)) {
				return prev.filter((sid) => sid !== id);
			} else {
				return [...prev, id];
			}
		});
	};

	const handleSelectAll = (e) => {
		const checked = e.target.checked;
		setSelectAll(checked);
		if (checked) {
			setSelectedIds(RAMs.map((ram) => ram._id));
		} else {
			setSelectedIds([]);
		}
	};

	useEffect(() => {
		if (RAMs.length > 0 && selectedIds.length === RAMs.length) {
			setSelectAll(true);
		} else {
			setSelectAll(false);
		}
	}, [selectedIds, RAMs]);

	const deleteOne = async (id) => {
		try {
			await deleteData(`/api/product/productRAMs/${id}`);
			context.openAlertBox("success", "Deleted successfully");
			getProductRAMs();
		} catch (error) {
			context.openAlertBox("error", "Failed to delete item");
		}
	};

	// ✅ Delete multiple RAMs
	const deleteMultipleRams = async () => {
		if (selectedIds.length === 0) {
			return context.openAlertBox("error", "No items selected");
		}
		try {
			await deleteMultiple(
				"/api/product/productRAMs/deleteMultiple",
				selectedIds
			);
			context.openAlertBox("success", "Selected items deleted successfully");
			setSelectedIds([]);
			getProductRAMs();
		} catch (error) {
			context.openAlertBox("error", "Failed to delete selected items");
		}
	};

	const handleEdit = (ram) => {
		setEditId(ram._id);
		setEditValue(ram.name);
	};
	const handleSave = async (id) => {
		if (!editValue.trim())
			return context.openAlertBox("error", "Name cannot be empty");
		try {
			await putData(`/api/product/updateProductRAMs/${id}`, {
				name: editValue,
			});
			context.openAlertBox("success", "Product RAM updated successfully");
			setEditId(null);
			getProductRAMs();
		} catch (error) {
			context.openAlertBox("error", "Failed to update Product RAM");
			console.log(error);
		}
	};
	return (
		<>
			<div className="flex items-center justify-between px-2 py-0 mt-3 w-[65%]">
				<h2 className="text=[18px] font[600] ">Add Product RAMs</h2>
				{selectedIds.length > 0 && (
					<Button
						onClick={deleteMultipleRams}
						className="!bg-red-600 !text-white hover:!bg-red-700"
					>
						Delete Selected ({selectedIds.length})
					</Button>
				)}
			</div>

			<div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white w-[65%] ">
				<form className="form py-3 p-8" onSubmit={handleSubmit}>
					<div className="col mb-4">
						<h3 className="text-[14px] font-[500] mb-1 text-black ">
							PRODUCT RAM
						</h3>
						<input
							type="text"
							className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
							name="name"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</div>

					<Button type="submit" className="btn-blue btn-lg w-full flex gap-2 ">
						<FaCloudUploadAlt className="text-[25px] text-white " />
						Publish and View
					</Button>
				</form>
			</div>

			<div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
				<div className="relative overflow-x-auto mt-5 pb-5">
					{loading ? (
						<div className="flex justify-center items-center py-10">
							<CircularProgress size={30} />
						</div>
					) : RAMs.length === 0 ? (
						<p className="text-center text-gray-500 py-6 ">
							No Product RAMs availble
						</p>
					) : (
						<table className="w-full text-sm text-left rtl:text-right text-gray-500">
							<thead className="text-xs text-gray-800 uppercase bg-gray-100">
								<tr>
									<th scope="col" className="px-6 pr-0 py-3" width="10%">
										<div className="w-[60px]">
											<Checkbox
												size="small"
												checked={selectAll}
												onChange={handleSelectAll}
											/>
										</div>
									</th>
									<th
										scope="col"
										className="px-0 py-3 whitespace-nowrap"
										width="60%"
									>
										PRODUCT RAM
									</th>
									<th
										scope="col"
										className="px-6 py-3 whitespace-nowrap"
										width="30%"
									>
										ACTION
									</th>
								</tr>
							</thead>

							<tbody>
								{/* {console.log(RAMs)} */}
								{RAMs.map((ram, i) => (
									<tr className="odd:bg-white even:bg-gray-50 border-b" key={i}>
										<td className="px-6 pr-0 py-2">
											<div>
												<Checkbox
													size="small"
													checked={selectedIds.includes(ram._id)}
													onChange={() => handleSelect(ram._id)}
												/>
											</div>
										</td>

										<td>
											{editId === ram._id ? (
												<div className="flex items-center gap-2">
													<input
														type="text"
														className="border border-gray-300 rounded-sm p-1 text-sm focus:outline-none"
														value={editValue}
														onChange={(e) => setEditValue(e.target.value)}
													/>
													<Button
														size="small"
														variant="contained"
														className="!bg-blue-600 !text-white !text-xs !py-1 !px-3"
														onClick={() => handleSave(ram._id)}
													>
														Save
													</Button>
												</div>
											) : (
												ram.name
											)}
										</td>

										<td className="px-6 py-2">
											<div className="flex items-center gap-1">
												<Button
													disabled={editId === ram._id}
													className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400 !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]"
													onClick={() => handleEdit(ram)}
												>
													<AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
												</Button>
												<Button
													className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]"
													onClick={() => deleteOne(ram._id)}
												>
													<MdOutlineDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
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

export default AddRAMs;
