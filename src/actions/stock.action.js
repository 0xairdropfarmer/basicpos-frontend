import { httpClient } from "./../utils/HttpClient";
import {
  PRODUCT_SUCCESS,
  PRODUCT_FETCHING,
  PRODUCT_FAILED,
  server,
  PRODUCT_CLEAR,
} from "../constants";

export const setStateProductToSuccess = (payload) => ({
  type: PRODUCT_SUCCESS,
  payload,
});

const setStateProductToFetching = () => ({
  type: PRODUCT_FETCHING,
});

const setStateProductToFailed = () => ({
  type: PRODUCT_FAILED,
});

const setStateProductToClear = () => ({
  type: PRODUCT_CLEAR,
});

export const clearProduct = () => {
  return (dispatch) => {
    dispatch(setStateProductToClear());
  };
};

export const getProducts = () => {
  return (dispatch) => {
    dispatch(setStateProductToFetching());
    doGetProducts(dispatch);
  };
};

export const addProduct = (formData, history) => {
  return async (dispatch) => {
    await httpClient.post(server.PRODUCT_URL, formData);
    history.goBack();
  };
};

export const updateProduct = (formData, history) => {
  return async (dispatch) => {
    await httpClient.put(server.PRODUCT_URL, formData);
    history.goBack();
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setStateProductToFetching());
      let result = await httpClient.get(`${server.PRODUCT_URL}/id/${id}`);
      dispatch(setStateProductToSuccess(result.data));
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStateProductToFailed());
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(setStateProductToFetching());
    await httpClient.delete(`${server.PRODUCT_URL}/id/${id}`);
    await doGetProducts(dispatch);
  };
};

export const getProductByKeyword = (event) => {
  return async (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateProductToFetching());

    if (keyword !== null && keyword !== "") {
      let result = await httpClient.get(
        `${server.PRODUCT_URL}/name/${keyword}`
      );
      dispatch(setStateProductToSuccess(result.data));
    } else {
      doGetProducts(dispatch);
    }
  };
};

const doGetProducts = async (dispatch) => {
  try {
    console.log("3");
    let result = await httpClient.get(
      process.env.REACT_APP_API_URL + server.PRODUCT_URL
    );
    // console.log(result);
    dispatch(setStateProductToSuccess(result.data.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateProductToFailed());
  }
};
