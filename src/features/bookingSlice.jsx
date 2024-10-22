// bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for booking accommodation
export const bookAccommodation = createAsyncThunk(
  'booking/bookAccommodation',
  async ({ userId, accommodationId, checkInDate, checkOutDate, guests, totalPrice, adults, kids }, { rejectWithValue }) => {
    try {
      // Mock API call or Firebase database logic here
      // Return serialized data
      const bookingData = {
        userId,
        accommodationId,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
        adults,
        kids,
      };

      return bookingData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add additional booking-related reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAccommodation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload); // Add the new booking
      })
      .addCase(bookAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
