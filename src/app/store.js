// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import adminReducer from "../features/adminSlice";
import rateUsReducer from '../features/rateUsSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    admin:adminReducer,
    rateUs: rateUsReducer,

  },
});

export default store;
