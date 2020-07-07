import {
  POSMACHINE_FETCHING,
  POSMACHINE_SUCCESS,
  POSMACHINE_FAILED,
  POSMACHINE_CLEAR,
} from "../constants";

const initialState = {
  isFetching: false,
  isError: false,
  result: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POSMACHINE_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case POSMACHINE_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };
    case POSMACHINE_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };
    case POSMACHINE_CLEAR:
      return { ...state, result: null, isFetching: false, isError: false };
    default:
      return state;
  }
};
