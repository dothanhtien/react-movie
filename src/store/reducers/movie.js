import { actionType } from "../actions/type";

const initialState = {
  movieList: [],
  movieDetail: null,
  movieShowtimes: null,
  pagination: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_MOVIES_SUCCESS:
      state.movieList = payload;
      return { ...state };
    case actionType.FETCH_MOVIE_SUCCESS:
      state.movieDetail = payload;
      return { ...state };
    case actionType.FETCH_MOVIE_SHOWTIMES_SUCCESS:
      state.movieShowtimes = payload;
      return { ...state };
    case actionType.FETCH_MOVIES_WITH_PAGINATION_SUCCESS:
      const { count, currentPage, totalCount, totalPages, items } = payload;
      state.movieList = items;
      state.pagination = { count, currentPage, totalCount, totalPages };
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
