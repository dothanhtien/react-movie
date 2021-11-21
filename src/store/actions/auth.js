import { createAction } from ".";
import { actionType } from "./type";
import { authService } from "../../services";
import { ACCESS_TOKEN } from "../../utils/constants/appConfig";

export const signIn = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.SET_AUTH_ERROR, null));

    try {
      const res = await authService.signIn(data);

      localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken);
      dispatch(createAction(actionType.SIGNIN_SUCCESS, res.data.content));

      if (callback) callback();
    } catch (err) {
      console.log(err);
      dispatch(createAction(actionType.SET_AUTH_ERROR, err.response.data));
    }
  };
};

export const signUp = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.SET_AUTH_ERROR, null));
    try {
      await authService.signUp(data);

      dispatch(createAction(actionType.SIGNUP_SUCCESS));

      if (callback) callback();
    } catch (err) {
      console.log(err);
      dispatch(createAction(actionType.SET_AUTH_ERROR, err.response.data));
    }
  };
};

export const fetchMe = async (dispatch) => {
  try {
    const res = await authService.fetchMe();

    dispatch(createAction(actionType.SIGNIN_SUCCESS, res.data.content));
  } catch (err) {
    console.log(err);

    if (err.response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.reload();
    }
  }
};
