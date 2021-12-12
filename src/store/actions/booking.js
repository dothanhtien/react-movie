import { bookingService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchMovieShowtimeDetails = (params) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_MOVIE_SHOWTIME_REQUEST));
    try {
      const res = await bookingService.fetchMovieShowtimeDetails(params);

      dispatch(
        createAction(actionType.FETCH_MOVIE_SHOWTIME_SUCCESS, res.data.content)
      );
    } catch (err) {
      console.log(err);
    }
  };
};
