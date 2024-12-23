import { configureStore } from "@reduxjs/toolkit";
import { authSlice,formsSlice } from "../features/index.js"

const store = configureStore({
  reducer : {
    auth : authSlice,
    forms : formsSlice,
  }
});

export default store;