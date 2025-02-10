
import axios from "axios";
import {
  readUser
} from "../services/localStorage.service";
// import { logout } from "../redux/authSlice";

export const httpApi = axios.create({
  baseURL: "https://store-app-production.up.railway.app/api/",
  
});
httpApi.interceptors.request.use(
  config => {
    const token = readUser();
    console.log('التوكين الموجود:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

httpApi.interceptors.response.use(
  response => {
    console.log('استجابة ناجحة:', response.status);
    return response;
  },
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await api.post('/auth/refreshtoken', {
          refreshToken: localStorage.getItem('refreshToken')
        });
        console.log('تم الحصول على توكين جديد:', response.data);
        localStorage.setItem('token', response.data.token);
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        
        return api(originalRequest);
      } catch (err) {
        console.error('فشل في الحصول على توكين جديد:', err.message);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// httpApi.interceptors.request.use(
//   (config) => {
//       const token = store.getState().auth.token; // Get token from Redux
//       if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//   },
//   (error) => {
//       return Promise.reject(error);
//   }
// );

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
