import { actionType } from "../actions/type";

const initialState = {
  cinemaComplexShowtimes: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_CINEMA_COMPLEX_SHOWTIMES_SUCCESS:
      state.cinemaComplexShowtimes = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
