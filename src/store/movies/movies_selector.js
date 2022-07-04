import { createSelector } from "reselect";

const selectMoviesReducer = (state) => state.movies;

export const selectMovies = createSelector(
  [selectMoviesReducer],
  (moviesSlice) => moviesSlice.Movies
);
