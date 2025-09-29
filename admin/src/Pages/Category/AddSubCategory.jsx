import React, { useState, useEffect, useContext } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
	Button,
	CircularProgress,
	MenuItem,
	Select,
	Divider,
	Paper,
	Typography,
	TextField,
} from "@mui/material";
import { fetchDataFromApi, postData } from "../../utils/api";
import MyContext from "../../context/MyContext";

function AddSubCategory() {
	const [categories, setCategories] = useState([]);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const context = useContext(MyContext);

	const [subCatForm, setSubCatForm] = useState({
		parentId: "",
		parentCatName: "",
		name: "",
	});

	const [thirdCatForm, setThirdCatForm] = useState({
		mainCatId: "",
		subCatId: "",
		name: "",
	});
	const [subCategories, setSubCategories] = useState([]);

	// Fetch categories
	useEffect(() => {
		fetchDataFromApi("/api/category/categories").then((res) => {
			if (res?.data) setCategories(res.data);
		});
	}, []);

	// ------------ Subcategory Handlers ------------
	const handleSubCatChange = (e) => {
		const selectedId = e.target.value;
		const parent = categories.find((cat) => cat._id === selectedId);
		setSubCatForm((prev) => ({
			...prev,
			parentId: parent?._id || "",
			parentCatName: parent?.name || "",
		}));
	};

	const handleSubCatInput = (e) =>
		setSubCatForm((prev) => ({ ...prev, name: e.target.value }));

	const handleSubmitSubCat = async (e) => {
		e.preventDefault();
		setMessage("");

		if (!subCatForm.parentId) return setMessage("⚠️ Select a main category");
		if (!subCatForm.name.trim()) return setMessage("⚠️ Enter subcategory name");

		try {
			setIsLoading(true);
			const result = await postData("/api/category/create", {
				parentId: subCatForm.parentId,
				parentCatName: subCatForm.parentCatName,
				name: subCatForm.name.trim(),
			});
			if (result.success) {
				setMessage("✅ Subcategory created successfully");
				setSubCatForm({ parentId: "", parentCatName: "", name: "" });
				setTimeout(() => {
					context.setIsOpenFullScreenPanel({ open: false });
				}, 2000);
			} else {
				setMessage(`❌ ${result.message}`);
			}
		} catch (error) {
			console.error(error);
			setMessage("❌ Server error. Try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// ------------ Third Level Handlers ------------
	const handleMainCatChange = (e) => {
		const mainId = e.target.value;
		const parent = categories.find((cat) => cat._id === mainId);
		setThirdCatForm((prev) => ({
			...prev,
			mainCatId: parent?._id || "",
			subCatId: "",
		}));
		setSubCategories(parent?.children || []);
	};

	const handleSubCatSelect = (e) =>
		setThirdCatForm((prev) => ({ ...prev, subCatId: e.target.value }));

	const handleThirdCatInput = (e) =>
		setThirdCatForm((prev) => ({ ...prev, name: e.target.value }));

	const handleSubmitThirdCat = async (e) => {
		e.preventDefault();
		setMessage("");

		if (!thirdCatForm.mainCatId) return setMessage("⚠️ Select a main category");
		if (!thirdCatForm.subCatId) return setMessage("⚠️ Select a subcategory");
		if (!thirdCatForm.name.trim())
			return setMessage("⚠️ Enter third level category name");

		try {
			setIsLoading(true);
			const result = await postData("/api/category/create", {
				parentId: thirdCatForm.subCatId,
				name: thirdCatForm.name.trim(),
			});
			if (result.success) {
				setMessage("✅ Third level category created successfully");
				setThirdCatForm({ mainCatId: "", subCatId: "", name: "" });
				setSubCategories([]);
				setTimeout(() => {
					context.setIsOpenFullScreenPanel({ open: false });
				}, 2000);
			} else {
				setMessage(`❌ ${result.message}`);
			}
		} catch (error) {
			console.error(error);
			setMessage("❌ Server error. Try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Paper elevation={2} className="p-6 bg-white rounded-xl space-y-8">
			{/* ---------- FORM 1 ---------- */}
			<form onSubmit={handleSubmitSubCat} className="space-y-4">
				<Typography variant="h6" fontWeight="bold" color="primary">
					Add Subcategory
				</Typography>

				<Select
					fullWidth
					size="small"
					value={subCatForm.parentId}
					onChange={handleSubCatChange}
					displayEmpty
				>
					<MenuItem value="">
						<em>Select Main Category</em>
					</MenuItem>
					{categories.map((cat) => (
						<MenuItem key={cat._id} value={cat._id}>
							{cat.name}
						</MenuItem>
					))}
				</Select>

				<TextField
					fullWidth
					size="small"
					variant="outlined"
					value={subCatForm.name}
					onChange={handleSubCatInput}
					placeholder="Enter subcategory name"
				/>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					disabled={isLoading}
					startIcon={!isLoading && <FaCloudUploadAlt />}
				>
					{isLoading ? (
						<CircularProgress size={20} color="inherit" />
					) : (
						"Publish Subcategory"
					)}
				</Button>
			</form>

			<Divider />

			{/* ---------- FORM 2 ---------- */}
			<form onSubmit={handleSubmitThirdCat} className="space-y-4">
				<Typography variant="h6" fontWeight="bold" color="primary">
					Add Third Level Category
				</Typography>

				<Select
					fullWidth
					size="small"
					value={thirdCatForm.mainCatId}
					onChange={handleMainCatChange}
					displayEmpty
				>
					<MenuItem value="">
						<em>Select Main Category</em>
					</MenuItem>
					{categories.map((cat) => (
						<MenuItem key={cat._id} value={cat._id}>
							{cat.name}
						</MenuItem>
					))}
				</Select>

				{subCategories.length > 0 && (
					<Select
						fullWidth
						size="small"
						value={thirdCatForm.subCatId}
						onChange={handleSubCatSelect}
						displayEmpty
					>
						<MenuItem value="">
							<em>Select Subcategory</em>
						</MenuItem>
						{subCategories.map((sub) => (
							<MenuItem key={sub._id} value={sub._id}>
								{sub.name}
							</MenuItem>
						))}
					</Select>
				)}

				<TextField
					fullWidth
					size="small"
					variant="outlined"
					value={thirdCatForm.name}
					onChange={handleThirdCatInput}
					placeholder="Enter third level category name"
				/>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					disabled={isLoading}
					startIcon={!isLoading && <FaCloudUploadAlt />}
				>
					{isLoading ? (
						<CircularProgress size={20} color="inherit" />
					) : (
						"Publish Third Level Category"
					)}
				</Button>
			</form>

			{/* ---------- MESSAGE ---------- */}
			{message && (
				<Typography
					variant="body2"
					className={`pt-2 ${
						message.startsWith("✅")
							? "text-green-600"
							: message.startsWith("⚠️")
							? "text-yellow-600"
							: "text-red-600"
					}`}
				>
					{message}
				</Typography>
			)}
		</Paper>
	);
}

export default AddSubCategory;
