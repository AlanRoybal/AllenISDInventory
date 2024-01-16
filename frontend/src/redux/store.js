import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
<<<<<<< HEAD
import itemReducer from "../redux/features/item/itemSlice";
import filterReducer from "../redux/features/item/filterSlice";
=======
>>>>>>> parent of 4dd676c (adding items to database functionality)

export const store = configureStore({
  reducer: {
    auth: authReducer,
<<<<<<< HEAD
    item: itemReducer,
    filter: filterReducer,
=======
>>>>>>> parent of 4dd676c (adding items to database functionality)
  },
});