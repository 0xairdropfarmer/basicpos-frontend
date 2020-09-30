import { httpClient } from "./../utils/HttpClient";

import {
  TRANSACTION_SUCCESS,
  TRANSACTION_FETCHING,
  TRANSACTION_FAILED,
  server
} from "./../constants";

const setStateTransactionToSuccess = payload => ({
  type: TRANSACTION_SUCCESS,
  payload: payload
});

const setStateTransactionToFetching = () => ({
  type: TRANSACTION_FETCHING
});

const setStateTransactionToFailed = () => ({
  type: TRANSACTION_FAILED
});

export const getTransactions = () => {
  setStateTransactionToFetching();
  return dispatch => {
    httpClient
      .get(server.TRANSACTION_URL)
      .then(result => {
        dispatch(setStateTransactionToSuccess(result.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(setStateTransactionToFailed());
      });
  };
};
