import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import storeDataReducer from "./features/storeData/storeDataSlice";
import appointmentReducer from "./features/appointment/appointmentSlice";
import reservationReducer from "./features/reservation/reservationSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    storeData: storeDataReducer,
    appointment: appointmentReducer,
    reservation: reservationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable value check
    }),
});

export default store;
