import { actionType } from "../actions/type";

const initialState = null;

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SIGNIN_SUCCESS:
      state = payload;
      return state;
    case actionType.SIGNOUT_SUCCESS:
      state = null;
      return state;
    default:
      return state;
  }
};

export default reducer;
