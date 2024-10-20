// rateUsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rating: 0,
  note: '',
  feedbackSubmitted: false,
};

const rateUsSlice = createSlice({
  name: 'rateUs',
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setNote: (state, action) => {
      state.note = action.payload;
    },
    submitFeedback: (state) => {
      state.feedbackSubmitted = true; // Mark feedback as submitted
    },
    resetFeedback: (state) => {
      state.rating = 0;
      state.note = '';
      state.feedbackSubmitted = false;
    },
  },
});

export const { setRating, setNote, submitFeedback, resetFeedback } = rateUsSlice.actions;
export default rateUsSlice.reducer;
