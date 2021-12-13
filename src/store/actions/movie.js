import { movieService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchAllMovies = (params) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_MOVIES_REQUEST));
    try {
      const res = await movieService.fetchAllMovies(params);

      setTimeout(() => {
        dispatch(
          createAction(actionType.FETCH_MOVIES_SUCCESS, res.data.content)
        );
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchMoviesWithPagination = (params) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_MOVIES_WITH_PAGINATION_REQUEST));
    try {
      const res = await movieService.fetchMoviesWithPagination(params);

      dispatch(
        createAction(
          actionType.FETCH_MOVIES_WITH_PAGINATION_SUCCESS,
          res.data.content
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchMovieDetail = (id) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_MOVIE_REQUEST));
    try {
      const res = await movieService.fetchMovieDetail(id);

      setTimeout(() => {
        dispatch(
          createAction(actionType.FETCH_MOVIE_SUCCESS, res.data.content)
        );
      }, 500);
    } catch (err) {
      console.log({ ...err });
    }
  };
};
