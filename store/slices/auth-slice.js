import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  session: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthSuccess: (state, action) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAuth: () => initialState
  }
});

export const { setAuthLoading, setAuthSuccess, setAuthError, clearAuth } = authSlice.actions;

export default authSlice.reducer;
