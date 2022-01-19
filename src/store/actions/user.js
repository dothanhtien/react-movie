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

export const fetchUserDetail = (username) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.FETCH_USER_DETAIL_REQUEST));
    try {
      // const res = await userService.fetchUserDetail(username);
      const res = await userService.findUsers(username);

      if (res.status === 200) {
        dispatch(
          createAction(
            actionType.FETCH_USER_DETAIL_SUCCESS,
            res.data.content[0]
          )
        );
      }
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

export const updateUser = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.UPDATE_USER_REQUEST));
    try {
      await userService.updateUser(data);

      dispatch(createAction(actionType.UPDATE_USER_SUCCESS));
      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (username, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.DELETE_USER_REQUEST));
    try {
      await userService.deleteUser(username);

      dispatch(createAction(actionType.DELETE_USER_SUCCESS));
      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};
