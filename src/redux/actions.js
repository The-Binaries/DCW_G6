export const ADD_TO_CART = 'ADD_TO_CART';
export const SET_APPOINTMENT = 'SET_APPOINTMENT';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const setAppointment = (appointment) => ({
  type: SET_APPOINTMENT,
  payload: appointment,
});
