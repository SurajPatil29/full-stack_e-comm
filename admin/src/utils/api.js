import axios from "axios";
import { refreshToken } from "./refreshToken";

const apiUrl = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("accessToken");

const handleLogout = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("userId");
	window.location.href = "/login";
};

export const postData = async (url, formData) => {
	try {
		// console.log(apiUrl + url);
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

//this used for img upload
export const postFormData = async (url, formData) => {
	try {
		// console.log(apiUrl + url);
		const responce = await fetch(apiUrl + url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
			body: formData,
			// credentials: "include",
		});

		const data = await responce.json();
		return data;
	} catch (error) {
		console.log("Error", error);
		return { error: true, message: "Network error" };
	}
};

export const fetchDataFromApi = async (url) => {
	try {
		const response = await fetch(`${apiUrl}${url}`, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
				"Content-Type": "application/json",
			},
			// credentials: "include", // 🔥 required if cookies involved
		});

		const data = await response.json();

		// Check if token expired
		if (response.status === 401 && data.message === "TOKEN_EXPIRED") {
			console.warn("Access token expired. Trying refresh...");

			const refreshResponse = await refreshToken("/api/user/refresh-token");
			// console.log(refreshResponse);
			if (refreshResponse.error) {
				// Refresh failed → logout
				// console.log(refreshResponse.error);
				handleLogout();
				return {
					error: true,
					message: "Session expired. Please log in again.",
				};
			}

			// Retry with new access token
			const newAccessToken = localStorage.getItem("accessToken");
			const retryResponse = await fetch(`${apiUrl}${url}`, {
				headers: {
					Authorization: `Bearer ${newAccessToken}`,
					"Content-Type": "application/json",
				},
				// credentials: "include",
			});

			const retryData = await retryResponse.json();
			if (!retryResponse.ok) {
				return { error: true, message: retryData.message || "Retry failed" };
			}
			return retryData;
		}

		// Normal error
		if (!response.ok) {
			return { error: true, message: data.message || "Request failed" };
		}

		return data;
	} catch (error) {
		console.error("API error:", error);
		return { error: true, message: "Network error" };
	}
};

export const deleteImagefromCloudi = async (url, query) => {
	try {
		const response = await fetch(`${apiUrl}${url}?img=${query}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
		const data = await response.json();

		if (!response.ok) {
			return { error: true, message: data.message || "Failed to delete image" };
		}
		return data;
	} catch (error) {
		console.error("Delete image error:", error);
		return { error: true, message: "Network error" };
	}
};

export const deleteData = async (url) => {
	try {
		const response = await fetch(apiUrl + url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getToken()}`,
			},
		});

		if (!response.ok) {
			return { success: false, message: `HTTP error ${response.status}` };
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error", error);
		return { success: false, message: "Network error", error: true };
	}
};

export const putData = async (url, formData) => {
	try {
		// console.log(apiUrl + url);
		const response = await fetch(apiUrl + url, {
			method: "put",
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

export const deleteMultiple = async (url, formData) => {
	try {
		// console.log(`${apiUrl}${url}`, formData);
		const response = await fetch(apiUrl + url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getToken()}`,
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			return { success: false, message: `HTTP error ${response.status}` };
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error", error);
		return { success: false, message: "Network error", error: true };
	}
};
// export const refreshToken = async (url) => {
// 	try {
// 		const response = await fetch(`${apiUrl}${url}`, {
// 			method: "POST", // refresh token is usually POST
// 			credentials: "include", // include cookies (important if refreshToken stored in cookies)
// 			headers: {
// 				Authorization: `Bearer ${getToken()}`, // optional, in case refresh token also comes from header
// 				"Content-Type": "application/json",
// 			},
// 		});

// 		const data = await response.json();

// 		if (!response.ok) {
// 			return {
// 				error: true,
// 				message: data.message || "Failed to refresh token",
// 			};
// 		}

// 		// Optionally update stored access token if returned
// 		if (data.data?.accessToken) {
// 			localStorage.setItem("accessToken", data.data.accessToken);
// 		}

// 		return data;
// 	} catch (error) {
// 		console.error("Refresh token error:", error);
// 		return { error: true, message: "Network error" };
// 	}
// };
