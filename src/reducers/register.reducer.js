import {
  REGISTER_FETCHING,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from "../constants";

const initialState = {
  isFetching: false,
  isError: false,
  result: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case REGISTER_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };
    case REGISTER_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };
    default:
      return state;
  }
};
