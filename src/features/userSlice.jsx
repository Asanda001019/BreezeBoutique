
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../pages/Firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk('user/register', async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
});

export const loginUser = createAsyncThunk('user/login', async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
