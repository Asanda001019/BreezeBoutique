// adminSlice.js
import { createSlice } from '@reduxjs/toolkit';


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminData: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.adminData = action.payload; // Store admin data upon registration
      state.isAuthenticated = true; // Set authenticated status to true
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.adminData = action.payload; // Store admin data upon login
      state.isAuthenticated = true; // Set authenticated status to true
      state.error = null;
    },
    loginFail: (state, action) => {
      state.error = action.payload; // Store error message on login failure
    },
    logout: (state) => {
      state.adminData = null; // Clear admin data on logout
      state.isAuthenticated = false; // Set authenticated status to false
      state.error = null; // Clear error messages
    },
  },
});

export const { registerSuccess, loginSuccess, loginFail, logout } = adminSlice.actions;
export default adminSlice.reducer;
