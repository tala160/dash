import store from "../redux/store";
import axios from "axios";
// import { ApiError } from "@app/api/ApiError";
import {
  readToken,
  deleteToken,
  deleteUser,
} from "../Services/localStorage.service";
import { logout } from "../redux/authSlice";

export const httpApi = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

httpApi.interceptors.request.use((config) => {
  const token = readToken();

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

httpApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const originalRequest = error.config;

    if (error.response?.status === 401) {
      deleteToken();
      deleteUser();

      store.dispatch(logout());

      // Navigate to login page on 401 error (unauthorized)
      window.location.href = "/auth/login"; // Use window.location to redirect
    }

    // Handle other errors
    // throw new ApiError()(
    //   error.response?.data.message || error.message,
    //   error.response?.data
    // );
  }
);
