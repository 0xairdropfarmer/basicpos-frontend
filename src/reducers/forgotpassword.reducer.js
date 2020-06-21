import { FORGOT_FETCHING, FORGOT_SUCCESS, FORGOT_FAILED } from "../constants";

const initialState = {
  isFetching: false,
  isError: false,
  result: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FORGOT_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case FORGOT_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };
    case FORGOT_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };
    default:
      return state;
  }
};
