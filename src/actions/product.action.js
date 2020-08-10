import {
    PRODUCT_FETCHING,
    PRODUCT_SUCCESS,
    PRODUCT_FAILED,
    PRODUCT_CLEAR,
    FETCH_OPTION_SUCCESS
} from "../constants";
import swal from "sweetalert";
import { httpClient } from "./../utils/HttpClient";

export const setProductStateToFetching = () => ({
    type: PRODUCT_FETCHING,
});

export const setProductStateToFailed = () => ({
    type: PRODUCT_FAILED,
});
export const setProductStateToClear = () => ({
    type: PRODUCT_CLEAR,
});
export const setProductStateToSuccess = (payload) => ({
    type: PRODUCT_SUCCESS,
    payload,
});
export const setFetchOptionStateToSuccess = (payload) => ({
    type: FETCH_OPTION_SUCCESS,
    payload,
});

export const Index = () => {
    return async (dispatch) => {
        dispatch(setProductStateToFetching());
        const response = await httpClient.get(
            process.env.REACT_APP_API_URL + "product"
        );
        if (response.data.result == "success") {
            // console.log(response.data);
            dispatch(setProductStateToSuccess(response.data.data));
        } else if (response.data.result === "error") {
            dispatch(setProductStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const getDropdownPOS = () => {
    return async (dispatch) => {
        dispatch(setProductStateToFetching());
        const response = await httpClient.get(
            process.env.REACT_APP_API_URL + "get_supplier"
        );
        if (response.data.result == "success") {
            let result = response.data.data.flat().map(item => {
                return {
                    value: item._id,
                    label: item.alias
                };
            })

            dispatch(setFetchOptionStateToSuccess(result));
        } else if (response.data.result === "error") {
            dispatch(setProductStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const getSingleBranch = (id) => {
    return async (dispatch) => {
        dispatch(setProductStateToFetching());
        const response = await httpClient.get(
            process.env.REACT_APP_API_URL + "product/" + id
        );

        if (response.data.result == "success") {
            dispatch(getDropdownPOS()).then(() => {
                dispatch(setProductStateToSuccess(response.data.data));
            })

        } else if (response.data.result === "error") {
            dispatch(setProductStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const Create = (values, history) => {
    return async (dispatch) => {
        dispatch(setProductStateToFetching());
        const response = await httpClient.post(
            process.env.REACT_APP_API_URL + "product",
            values
        );
        if (response.data.result == "success") {
            dispatch(setProductStateToSuccess(response.data));
            swal("Success!", response.data.message, "success").then((value) => {
                dispatch(setProductStateToClear());
                history.goBack();
                dispatch(Index());
            });
        } else if (response.data.result === "error") {
            dispatch(setProductStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const Update = (values, history) => {
    return async (dispatch) => {
        dispatch(setProductStateToFetching());
        const response = await httpClient.put(
            process.env.REACT_APP_API_URL + "product",
            values
        );
        if (response.data.result == "success") {
            dispatch(setProductStateToClear());
            history.goBack();
            dispatch(Index());
        } else if (response.data.result === "error") {
            dispatch(setProductStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const Remove = (id) => {

    return async (dispatch) => {
        console.log("remove");
        dispatch(setProductStateToFetching());
        const response = await httpClient.delete(
            process.env.REACT_APP_API_URL + "product/" + id
        );
        if (response.data.result == "success") {
            dispatch(setProductStateToSuccess());
            dispatch(Index());
        } else if (response.data.result === "error") {
            dispatch(setProductStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const clearState = () => {
    return dispatch => {
        dispatch(setProductStateToClear())
    }
}