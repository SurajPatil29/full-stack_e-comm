import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/DashBoard";
import { createContext, useState } from "react";
import MainLayout from "./Components/MainLayout";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

const MyContext = createContext();

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true); // this is used for the sidebar open close
	const [isLogin, setIsLogin] = useState(false); // login state

	// this values var use in context
	const values = {
		isSidebarOpen,
		setIsSidebarOpen,
		isLogin,
		setIsLogin,
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
		},
		{
			path: "/login",

			element: (
				<>
					<Login />
				</>
			),
		},
		{
			path: "/signup",

			element: (
				<>
					<SignUp />
				</>
			),
		},
	]);
	return (
		<>
			<MyContext.Provider value={values}>
				<RouterProvider router={router} />
			</MyContext.Provider>
		</>
	);
}

export default App;
export { MyContext };
