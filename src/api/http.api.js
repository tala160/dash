import store from "../redux/store";
import axios from "axios";
// import { ApiError } from "@app/api/ApiError";
// import {
//   readToken,
//   deleteToken,
//   deleteUser,
// } from "../services/localStorage.service";
// import { logout } from "../redux/authSlice";

export const httpApi = axios.create({
  baseURL: "https://store-app-production.up.railway.app/api/",
  
});

httpApi.interceptors.request.use(
  (config) => {
      const token = store.getState().auth.token; // Get token from Redux
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// httpApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // const originalRequest = error.config;

//     if (error.response?.status === 401) {
//       deleteToken();
//       deleteUser();

//       store.dispatch(logout());

//       // Navigate to login page on 401 error (unauthorized)
//       window.location.href = "/auth/login"; // Use window.location to redirect
//     }

    // Handle other errors
    // throw new ApiError()(
    //   error.response?.data.message || error.message,
    //   error.response?.data
    // );
//   }
// );
