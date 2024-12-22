import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/authSlice";

const store = configureStore({
  reducer : {
    authSliceReducer
  }
});

export default store;