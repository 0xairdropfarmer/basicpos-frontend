import {
    SUPPLIER_FETCHING,
    SUPPLIER_SUCCESS,
    SUPPLIER_FAILED,
    SUPPLIER_CLEAR,
} from "../constants";

const initialState = {
    isFetching: false,
    isError: false,
    result: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SUPPLIER_FETCHING:
            return { ...state, isFetching: true, isError: false, result: null };
        case SUPPLIER_FAILED:
            return { ...state, isFetching: false, isError: true, result: null };
        case SUPPLIER_SUCCESS:
            return { ...state, isFetching: false, isError: false, result: payload };
        case SUPPLIER_CLEAR:
            return { ...state, result: null, isFetching: false, isError: false };
        default:
            return state;
    }
};
