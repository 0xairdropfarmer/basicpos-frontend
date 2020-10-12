import { STAT_FETCHING, STAT_SUCCESS, STAT_FAILED } from "../constants";

const initialState = {
  isFetching: false,
  isError: false,
  result: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case STAT_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case STAT_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };
    case STAT_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };

    default:
      return state;
  }
};
