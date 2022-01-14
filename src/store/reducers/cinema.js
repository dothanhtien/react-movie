import { actionType } from "../actions/type";

const initialState = {
  cinemaComplexes: [],
  cinemaGroups: [],
  cinemaComplexShowtimes: [],
  movieShowtimeDetails: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_CINEMA_COMPLEXES_SUCCESS:
      state.cinemaComplexes = payload;
      return { ...state };
    case actionType.FETCH_CINEMA_GROUP_BY_CINEMA_COMPLEX_SUCCESS:
      state.cinemaGroups = payload;
      return { ...state };
    case actionType.FETCH_CINEMA_COMPLEX_SHOWTIMES_SUCCESS:
      state.cinemaComplexShowtimes = payload;
      return { ...state };
    case actionType.FETCH_MOVIE_SHOWTIME_SUCCESS:
      state.movieShowtimeDetails = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
