import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: null,
  time: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointment: (state, action) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
    clearAppointment: (state) => {
      state.date = null;
      state.time = null;
    },
  },
});

export const { setAppointment, clearAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
