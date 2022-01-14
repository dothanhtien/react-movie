import { createAction } from ".";
import { cinemaService } from "../../services";
import { actionType } from "./type";

export const fetchCinemaComplexes = (params) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_CINEMA_COMPLEXES_REQUEST));
    try {
      const res = await cinemaService.fetchCinemaComplexes();

      dispatch(
        createAction(
          actionType.FETCH_CINEMA_COMPLEXES_SUCCESS,
          res.data.content
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCinemaGroupByCinemaComplex = (cinemaComplex) => {
  return async (dispatch) => {
    dispatch(
      createAction(actionType.FETCH_CINEMA_GROUP_BY_CINEMA_COMPLEX_REQUEST)
    );
    try {
      const res = await cinemaService.fetchCinemaGroupByCinemaComplex(
        cinemaComplex
      );

      dispatch(
        createAction(
          actionType.FETCH_CINEMA_GROUP_BY_CINEMA_COMPLEX_SUCCESS,
          res.data.content
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCinemaComplexShowtimes = (params) => {
  return async (dispatch) => {
    try {
      const res = await cinemaService.fetchCinemaComplexShowtimes(params);

      dispatch(
        createAction(
          actionType.FETCH_CINEMA_COMPLEX_SHOWTIMES_SUCCESS,
          res.data.content
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
};
