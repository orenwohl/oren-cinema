import { MOVIES_ACTION_TYPES } from "./movies_types";

const CART_INITIAL_STATE = {
  Movies: [],
};

export const moviesReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case MOVIES_ACTION_TYPES.SET_MOVIES:
      return {
        ...state,
        Movies: payload,
      };

    default:
      return state;
  }
};
