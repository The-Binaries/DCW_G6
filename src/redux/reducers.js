import { ADD_TO_CART, SET_APPOINTMENT } from './actions';

const initialState = {
  cart: [],
  appointment: null,
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case SET_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload,
      };
    default:
      return state;
  }
}

export default cartReducer;
