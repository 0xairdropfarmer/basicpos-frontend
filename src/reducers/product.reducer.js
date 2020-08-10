import {
    PRODUCT_FETCHING,
    PRODUCT_SUCCESS,
    PRODUCT_FAILED,
    PRODUCT_CLEAR,
    FETCH_OPTION_SUCCESS
} from "../constants";

const initialState = {
    isFetching: false,
    isError: false,
    result: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PRODUCT_FETCHING:
            return { ...state, isFetching: true, isError: false, result: null };
        case PRODUCT_FAILED:
            return { ...state, isFetching: false, isError: true, result: null };
        case PRODUCT_SUCCESS:
            return { ...state, isFetching: false, isError: false, result: payload };
        case PRODUCT_CLEAR:
            return { ...state, result: null, isFetching: false, isError: false };
        case FETCH_OPTION_SUCCESS:
            return { ...state, isFetching: false, isError: false, options: payload };
        default:
            return state;
    }
};
