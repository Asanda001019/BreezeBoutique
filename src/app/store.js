// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import adminReducer from "../features/adminSlice";
import rateUsReducer from '../features/rateUsSlice'; 
import bookingReducer from '../features/bookingSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin:adminReducer,
    rateUs: rateUsReducer,
    booking: bookingReducer,
    // Add other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['booking.bookings'], 
}})

})

export default store;
