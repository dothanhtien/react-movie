import { actionType } from "../actions/type";

const initialState = {
  userList: [],
  pagination: null,
  userTypes: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.FETCH_USERS_WITH_PAGINATION_SUCCESS:
      const { count, currentPage, totalCount, totalPages, items } = payload;
      state.userList = items;
      state.pagination = { count, currentPage, totalCount, totalPages };
      return { ...state };
    case actionType.FETCH_USER_TYPES_SUCCESS:
      state.userTypes = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
