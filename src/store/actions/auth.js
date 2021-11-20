import { createAction } from ".";
import { actionType } from "./type";
import { authService } from "../../services";

export const signIn = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.SIGNIN_FAILURE, null));

    try {
      const res = await authService.signIn(data);

      dispatch(createAction(actionType.SIGNIN_SUCCESS, res.data.content));

      if (callback) callback();
    } catch (err) {
      console.log({ ...err });
      dispatch(createAction(actionType.SIGNIN_FAILURE, err.response.data));
    }
  };
};
