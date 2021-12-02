import { createAction } from ".";
import { cinemaService } from "../../services";
import { actionType } from "./type";

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
