import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import itemReducer from "../redux/features/item/itemSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
  },
});