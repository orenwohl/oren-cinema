import { combineReducers } from "redux";

import { userReducer } from "./user/user_reducer";
import { moviesReducer } from "./movies/movies_reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
});
