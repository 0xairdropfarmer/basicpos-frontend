import {
  LOGIN_FETCHING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  server,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import jwt from "jsonwebtoken";
import swal from "sweetalert";
export const setLoginStateToFetching = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginStateToFailed = () => ({
  type: LOGIN_FAILED,
});

export const setLoginStateToSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

// Called by Login Component
export const login = (value, history) => {
  return async (dispatch) => {
    try {
      dispatch(setLoginStateToFetching()); // fetching
      let result = await httpClient.post(server.LOGIN_URL, value);
      console.log(result);
      if (result.data.result === "success") {
        const { token, refreshToken } = result.data;
        localStorage.setItem(server.TOKEN_KEY, token);
        localStorage.setItem(server.REFRESH_TOKEN_KEY, refreshToken);
        dispatch(setLoginStateToSuccess(result));
        swal("Success!", result.data.message, "success").then((value) => {});
        console.log("success");
        history.push("/dashboard");
      } else {
        swal("Error!", result.data.message, "error").then((value) => {});
        dispatch(setLoginStateToFailed(result));
      }
    } catch (error) {
      swal("Error!", error.message, "error").then((value) => {});
      dispatch(setLoginStateToFailed({ data: { message: error } }));
    }
  };
};

export const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);

  if (token) {
    var decodedToken = jwt.decode(token, { complete: true });
    var dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
