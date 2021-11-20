import { createAction } from ".";
import { actionType } from "./type";
import { authService } from "../../services";

export const signIn = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.SET_AUTH_ERROR, null));

    try {
      const res = await authService.signIn(data);

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
