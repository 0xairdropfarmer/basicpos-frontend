import { FORGOT_FETCHING, FORGOT_SUCCESS, FORGOT_FAILED } from "../constants";
import swal from "sweetalert";
import { httpClient } from "./../utils/HttpClient";

export const setForgotStateToFetching = () => ({
  type: FORGOT_FETCHING,
});

export const setForgotStateToFailed = () => ({
  type: FORGOT_SUCCESS,
});

export const setForgotStateToSuccess = (payload) => ({
  type: FORGOT_FAILED,
  payload,
});

export const forgotpassword = (values, history) => {
  return async (dispatch) => {
    dispatch(setForgotStateToFetching());
    const response = await httpClient.post(
      process.env.REACT_APP_API_URL + "password/reset",
      values
    );
    if (response.data.result == "success") {
      dispatch(setForgotStateToSuccess(response.data));
      swal("Success!", response.data.message, "warning").then((value) => {
        history.push("/login");
      });
    } else if (response.data.result === "error") {
      swal("Error!", response.data.message, "error");
    }
  };
};
