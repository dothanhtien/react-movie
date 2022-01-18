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

export const fetchUserTypes = () => {
  return async (dispatch) => {
    try {
      const res = await userService.fetchUserTypes();

      if (res.status === 200) {
        dispatch(
          createAction(actionType.FETCH_USER_TYPES_SUCCESS, res.data.content)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createUser = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.CREATE_USER_REQUEST));
    try {
      await userService.createUser(data);

      dispatch(createAction(actionType.CREATE_USER_SUCCESS));
      if (callback) callback();
    } catch (err) {
      console.log(err);
      dispatch(
        createAction(actionType.CREATE_USER_FAILURE, err.response?.data.content)
      );
    }
  };
};
