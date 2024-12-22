import { createSlice } from "@reduxjs/toolkit";

// Retrieve initial state from localStorage
const storedAuthState = JSON.parse(localStorage.getItem('authState'));
const initialState = storedAuthState || { status: false, userData: null };

// Instead of localStorage, Cookies can be used if session from backend is returned for more security
// Here to fake a session the localStorage is used

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      // Persist the updated login state to localStorage
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      // Remove login state from localStorage
      localStorage.removeItem('authState');
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

