// 🔥 This handles refresh token request
const apiUrl = import.meta.env.VITE_API_URL;
const RefreshToken = localStorage.getItem("refreshToken");

export const refreshToken = async (url) => {
	// console.log("apiUrl:", apiUrl);
	// console.log("url param:", url);
	// console.log("Final URL:", apiUrl + url);
	try {
		const response = await fetch(`${apiUrl}${url}`, {
			method: "POST",
			// credentials: "include", // include refreshToken cookie
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${RefreshToken}`,
			},
		});

		const data = await response.json();
		// console.log(data?.accessToken);
		if (!response.ok) {
			return {
				error: true,
				message: data.message || "Failed to refresh token",
			};
		}

		// Save new access token
		if (data?.accessToken) {
			localStorage.setItem("accessToken", data.accessToken);
		}

		return data;
	} catch (error) {
		console.error("Refresh token error:", error);
		return { error: true, message: "Network error" };
	}
};
