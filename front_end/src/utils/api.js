import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("accessToken");

export const postData = async (url, formData) => {
	try {
		const response = await fetch(apiUrl + url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getToken()}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
			withCredentials: true,
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Error", error);
		return { error: true, message: "Network error" };
	}
};

export const fetchDataFromApi = async (url) => {
	try {
		const { data } = await axios.get(apiUrl + url, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
				"Content-Type": "application/json",
			},
			// withCredentials: true,
		});

		return data;
	} catch (error) {
		console.log(error);
		return { error: true, message: "Fetch error" };
	}
};
