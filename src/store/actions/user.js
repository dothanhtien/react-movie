import { userService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchUsersWithPagination = (params) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_USERS_WITH_PAGINATION_REQUEST));
    try {
      const res = await userService.fetchUsersWithPagination(params);

      setTimeout(() => {
        if (res.status === 200) {
          dispatch(
            createAction(
              actionType.FETCH_USERS_WITH_PAGINATION_SUCCESS,
              res.data.content
            )
          );
        }
      }, 400);
    } catch (err) {
      console.log(err);
    }
  };
};
