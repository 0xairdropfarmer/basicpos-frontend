import {
    BRANCH_FETCHING,
    BRANCH_SUCCESS,
    BRANCH_FAILED,
    BRANCH_CLEAR,
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
        default:
            return state;
    }
};
