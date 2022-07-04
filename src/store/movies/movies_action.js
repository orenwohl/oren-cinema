import { MOVIES_ACTION_TYPES } from "./movies_types";
import { createAction } from "../reducer_utils";

export const setMovies = (moviesArray) =>
  createAction(MOVIES_ACTION_TYPES.SET_MOVIES, moviesArray);
