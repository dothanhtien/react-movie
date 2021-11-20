import { actionType } from "../actions/type";

const initialState = {
  error: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SIGNIN_FAILURE:
      state.error = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
