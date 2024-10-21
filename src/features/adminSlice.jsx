
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
      state.adminData = action.payload; 
      state.isAuthenticated = true; 
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.adminData = action.payload; 
      state.isAuthenticated = true; 
      state.error = null;
    },
    loginFail: (state, action) => {
      state.error = action.payload; 
    },
    logout: (state) => {
      state.adminData = null; 
      state.isAuthenticated = false; 
      state.error = null; 
    },
  },
});

export const { registerSuccess, loginSuccess, loginFail, logout } = adminSlice.actions;
export default adminSlice.reducer;
