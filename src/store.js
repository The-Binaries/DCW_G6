import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import storeDataReducer from "./features/storeData/storeDataSlice";
import appointmentReducer from "./features/appointment/appointmentSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    storeData: storeDataReducer,
    appointment: appointmentReducer,
  },
});

export default store;
