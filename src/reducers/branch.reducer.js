import {
    BRANCH_FETCHING,
    BRANCH_SUCCESS,
    BRANCH_FAILED,
    BRANCH_CLEAR,
    FETCHOPTION_SUCCESS
} from "../constants";

const initialState = {
    isFetching: false,
    isError: false,
    result: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case BRANCH_FETCHING:
            return { ...state, isFetching: true, isError: false, result: null };
        case BRANCH_FAILED:
            return { ...state, isFetching: false, isError: true, result: null };
        case BRANCH_SUCCESS:
            return { ...state, isFetching: false, isError: false, result: payload };
        case BRANCH_CLEAR:
            return { ...state, result: null, isFetching: false, isError: false };
        case FETCHOPTION_SUCCESS:
            return { ...state, isFetching: false, isError: false, options: payload };
        default:
            return state;
    }
};
