import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import storeDataReducer from "./features/storeData/storeDataSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    storeData: storeDataReducer,
  },
});

export default store;
