import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistUser } from '../services/localStorage.service';
// إعداد الحالة الأولية
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  forgetPasswordSuccess: false, 
  resetPasswordSuccess: false, 
};

// loginUser
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post(
      'https://store-app-production.up.railway.app/api/auth/login',
      credentials,  // Credentials (email and password) are sent in the body
      {
        headers: {
          'Content-Type': 'application/json',  // Ensure content type is set correctly
        },
      }
    );
 persistUser(response.data)
    
    return  response.data;
     } catch (error) {
    // Handle errors more gracefully
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message || 'Login failed' : 'Network error');
  }
});

// signupUser
export const signupUser = createAsyncThunk('auth/signup', async (userData) => {
  try {
    const response = await axios.post(
      'https://store-app-production.up.railway.app/api/auth/register',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message || 'Signup failed' : 'Network error');
  }
});

// دالة نسيان كلمة المرور
export const forgetPassword = createAsyncThunk('auth/forgetPassword', async (email) => {
  try {
    const response = await axios.post(
      'https://store-app-production.up.railway.app/api/auth/forget-password',  // Correct endpoint
      { email },  // Email is sent in the body
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Forget password failed:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message || 'Forget password failed' : 'Network error');
  }
});

// دالة إعادة تعيين كلمة المرور
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }) => {
    try {
      const response = await axios.post(
        `https://store-app-production.up.railway.app/api/auth/reset-password/${token}`,  // Correct endpoint with token in URL
        { newPassword },  // New password is sent in the body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; // تأكد من أن الخادم يعيد رسالة نجاح
    } catch (error) {
      console.error('Reset password failed:', error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message || 'Reset password failed' : 'Network error');
    }
  }
);


// إنشاء slice للمصادقة
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.forgetPasswordSuccess = false;
      state.resetPasswordSuccess = false;
      state.error = null; // Clear error on logout
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token; // تخزين التوكن عند تسجيل الدخول الناجح
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = 'Invalid credentials'; // Simplified error message
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.forgetPasswordSuccess = false;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgetPasswordSuccess = true;
        state.error = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.forgetPasswordSuccess = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.resetPasswordSuccess = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.resetPasswordSuccess = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
