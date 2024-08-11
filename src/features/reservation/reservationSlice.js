import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservations: [],
};

const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
  },
});

export const selectReservations = (state) => state.reservations;

export const { addReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
