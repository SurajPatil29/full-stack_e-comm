import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/DashBoard";
import React, { createContext, useState } from "react";
import MainLayout from "./Components/MainLayout";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import AddProduct from "./Pages/Products/AddProduct";

// add product dilog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoClose } from "react-icons/io5";
import Slide from "@mui/material/Slide";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import AddHomeSlider from "./Pages/HomeSliderBanners/AddHomeSlider";
import CategoryList from "./Pages/Category";
import AddCategory from "./Pages/Category/AddCategory";
import SubCatList from "./Pages/Category/SubCatList";
import AddSubCategory from "./Pages/Category/AddSubCategory";
import User from "./Pages/User";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";

// add product dilog

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
}); //this add product dilog transition

const MyContext = createContext();

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true); // this is used for the sidebar open close
	const [isLogin, setIsLogin] = useState(false); // login state
	const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
		open: false,
		model: "",
	}); //this use for open dilog for add product

	// this values var use in context
	const values = {
		isSidebarOpen,
		setIsSidebarOpen,
		isLogin,
		setIsLogin,
		isOpenFullScreenPanel,
		setIsOpenFullScreenPanel,
	};

	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <Dashboard />,
				},
			],
		}, //this type of router use for where i use side bar
		{
			path: "/login",

			element: <Login />,
		}, // this type of route  use where i not use sidebar
		{
			path: "/signup",

			element: <SignUp />,
		},
		{
			path: "/products",
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <Products />,
				},
			],
		},
		{
			path: "/homeslider/list",
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <HomeSliderBanners />,
				},
			],
		},
		{
			path: "/category/list",
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <CategoryList />,
				},
			],
		},
		{
			path: "/subcategory/list",
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <SubCatList />,
				},
			],
		},
		{
			path: "/user",
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <User />,
				},
			],
		},
		{
			path: "/orders",
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <Orders />,
				},
			],
		},
		{
			path: "/forgot-password",

			element: <ForgotPassword />,
		},
		{
			path: "/verify-account",

			element: <VerifyAccount />,
		},
		{
			path: "/change-password",

			element: <ChangePassword />,
		},
	]);
	return (
		<>
			<MyContext.Provider value={values}>
				<RouterProvider router={router} />

				<Dialog
					fullScreen
					open={isOpenFullScreenPanel.open}
					onClose={() =>
						setIsOpenFullScreenPanel({
							open: false,
							model: "",
						})
					}
					slots={{
						transition: Transition,
					}}
				>
					<AppBar sx={{ position: "relative" }}>
						<Toolbar className="bg-[#e6e6e6] text-black ">
							<IconButton
								edge="start"
								color="inherit"
								onClick={() =>
									setIsOpenFullScreenPanel({
										open: false,
										model: "",
									})
								}
								aria-label="close"
							>
								<IoClose />
							</IconButton>
							<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
								<span>{isOpenFullScreenPanel.model}</span>
							</Typography>
						</Toolbar>
					</AppBar>
					{isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
					{isOpenFullScreenPanel?.model === "Add Home Slide" && (
						<AddHomeSlider />
					)}
					{isOpenFullScreenPanel?.model === "Add New Category" && (
						<AddCategory />
					)}
					{isOpenFullScreenPanel?.model === "Add New Sub Category" && (
						<AddSubCategory />
					)}
				</Dialog>
			</MyContext.Provider>
		</>
	);
}

export default App;
export { MyContext };
