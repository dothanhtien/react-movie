import { movieService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchAllMovies = (params) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_MOVIES_REQUEST));
    try {
      const res = await movieService.fetchAllMovies(params);

      dispatch(createAction(actionType.FETCH_MOVIES_SUCCESS, res.data.content));
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

      dispatch(createAction(actionType.FETCH_MOVIE_SUCCESS, res.data.content));
    } catch (err) {
      console.log({ ...err });
    }
  };
};
