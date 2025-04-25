import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/DashBoard";
import { createContext, useState } from "react";
import MainLayout from "./Components/MainLayout";

const MyContext = createContext();

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const values = {
		isSidebarOpen,
		setIsSidebarOpen,
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
