import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./componants/header";
import { Home } from "./pages/Home";
import Footer from "./componants/Footer";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import { createContext, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductZoom from "./componants/ProductZoom";
import { IoMdClose } from "react-icons/io";
import ProductDetailsComponant from "./componants/ProductDetailsComponant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Drawer } from "@mui/material";
import CartPanel from "./componants/CartPanel";

const MyContext = createContext();
function App() {
	const [openProductDetailsModel, setOpenProductDetailsModel] = useState(false);

	const [openCartPanel, setOpenCartPanel] = useState(true);

	const toggleDrawer = (newOpen) => () => {
		setOpenCartPanel(newOpen);
	};

	const handleCloseProductDetailsModel = () => {
		setOpenProductDetailsModel(false);
	};

	const value = {
		setOpenProductDetailsModel: setOpenProductDetailsModel,
		setOpenCartPanel: setOpenCartPanel,
	};
	return (
		<>
			<MyContext.Provider value={value}>
				<Header />
				<Routes>
					<Route path={"/"} exact={true} element={<Home />} />
					<Route
						path={"/productListing"}
						exact={true}
						element={<ProductListing />}
					/>
					<Route
						path={"/productDetails/:id"}
						exact={true}
						element={<ProductDetails />}
					/>
					<Route path={"/login"} exact={true} element={<Login />} />
					<Route path={"/register"} exact={true} element={<Register />} />
				</Routes>
				<Footer />
			</MyContext.Provider>

			<Dialog
				open={openProductDetailsModel}
				onClose={handleCloseProductDetailsModel}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				fullWidth={true}
				maxWidth="lg"
				className="productDetailsModel "
			>
				<DialogContent>
					<div className="productDetailsModelContainer flex item-center w-full relative">
						<Button
							className="!absolute !w-[40px] !min-w-[40px] !h-[40px] !bg-[#f1f1f1] !rounded-full !text-black right-0 top-0"
							onClick={handleCloseProductDetailsModel}
						>
							<IoMdClose className="!text-[18px]  " />
						</Button>
						<div className="col1 w-[43%] ">
							<ProductZoom />
						</div>
						<div className="col2 productContent w-[57%] px-5 ">
							<ProductDetailsComponant />
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* cart panel */}

			<Drawer open={openCartPanel} onClose={toggleDrawer(false)} anchor="right">
				<div className="w-[400px] py-3 px-4 ">
					<div className="flex items-center justify-between  gap-3  border-b border-[rgba(0,0,0,0.1)] ">
						<h4>Shoping Cart (1)</h4>
						<Button
							className=" !w-[30px] !min-w-[30px] !h-[30px] !bg-[#f1f1f1] !rounded-full !text-black right-0 top-0"
							onClick={toggleDrawer(false)}
						>
							<IoMdClose className="!text-[16px]  " />
						</Button>
					</div>
					<CartPanel />
				</div>
			</Drawer>
		</>
	);
}

export { MyContext, App };
