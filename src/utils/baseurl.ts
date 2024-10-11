import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Define the base query function
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASEURL,
  prepareHeaders: (headers) => {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// Define the type for the extended base query function
type BaseQueryWithAuthFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;

// Create a base query function with authentication handling
const baseQueryWithAuth: BaseQueryWithAuthFn = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    logoutUser();
  }
  return result;
};

// Function to handle user logout
const logoutUser = () => {
  // Remove items from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user"); // Fixed typo: "useer" to "user"

  // Optionally, navigate to login page or show a message
  window.location.reload();
};

export default baseQueryWithAuth;
