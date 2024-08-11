import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const service = action.payload;
      state.items.push(service);
      state.totalPrice += service.price;
    },
    addMultipleItemsToCart: (state, action) => {
      const services = action.payload;
      services.forEach((service) => {
        state.items.push(service);
        state.totalPrice += service.price;
      });
    },
    removeItemFromCart: (state, action) => {
      const serviceId = action.payload;
      const index = state.items.findIndex((item) => item.id === serviceId);
      if (index !== -1) {
        state.totalPrice -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export const {
  addItemToCart,
  addMultipleItemsToCart,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
