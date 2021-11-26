import { actionType } from "../actions/type";

const initialState = {
  movieList: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_MOVIES_SUCCESS:
      state.movieList = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
