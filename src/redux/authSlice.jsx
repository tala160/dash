import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// إعداد الحالة الأولية
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  forgetPasswordSuccess: false, // حالة نجاح نسيان كلمة المرور
  resetPasswordSuccess: false, // حالة نجاح إعادة تعيين كلمة المرور
};

// دالة تسجيل الدخول
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('https://your-api-url.com/api/login', credentials);
  return response.data;
});

// دالة تسجيل مستخدم جديد
export const signupUser = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post('https://your-api-url.com/api/signup', userData);
  return response.data;
});

// دالة نسيان كلمة المرور
export const forgetPassword = createAsyncThunk('auth/forgetPassword', async (email) => {
  const response = await axios.post('https://your-api-url.com/api/forget-password', { email });
  return response.data; // تأكد من أن الخادم يعيد رسالة نجاح
});

// دالة إعادة تعيين كلمة المرور
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, newPassword }) => {
  const response = await axios.post(`https://your-api-url.com/api/reset-password/${token}`, { newPassword });
  return response.data; // تأكد من أن الخادم يعيد رسالة نجاح
});

// إنشاء slice للمصادقة
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.forgetPasswordSuccess = false; // إعادة تعيين حالة نسيان كلمة المرور عند تسجيل الخروج
      state.resetPasswordSuccess = false; // إعادة تعيين حالة إعادة تعيين كلمة المرور عند تسجيل الخروج
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token; // تخزين التوكن عند تسجيل الدخول الناجح
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // تخزين رسالة الخطأ عند الفشل
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user; // تخزين معلومات المستخدم عند التسجيل الناجح
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.forgetPasswordSuccess = true; // تعيين حالة النجاح عند إرسال البريد الإلكتروني
        state.error = null; // إعادة تعيين أي خطأ سابق
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.forgetPasswordSuccess = false; // إذا فشلت العملية، تعيين الحالة إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordSuccess = true; // تعيين حالة النجاح عند تغيير كلمة المرور
        state.error = null; // إعادة تعيين أي خطأ سابق
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordSuccess = false; // إذا فشلت العملية، تعيين الحالة إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      });
  },
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;
