import { STAT_FETCHING, STAT_SUCCESS, STAT_FAILED, server } from "../constants";
import { httpClient } from "./../utils/HttpClient";

export const setSTATStateToFetching = () => ({
  type: STAT_FETCHING,
});

export const setSTATStateToFailed = () => ({
  type: STAT_FAILED,
});
export const setSTATStateToSuccess = (payload) => ({
  type: STAT_SUCCESS,
  payload,
});

export const getCurrentInventoryStat = () => {
  return async (dispatch) => {
    dispatch(setSTATStateToFetching());
    const response = await httpClient.get(
      server.STAT_ENDPOINT + "/current_inventory"
    );
    let result = response.data.data.flat().map((item) => {
      return {
        name: item.name,
        stock: item.stock,
      };
    });
    if (response.data.result == "success") {
      dispatch(setSTATStateToSuccess(result));
    } else if (response.data.result === "error") {
      dispatch(setSTATStateToFailed());
      return response.data.message;
    }
  };
};
