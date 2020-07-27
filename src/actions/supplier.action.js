import {
    SUPPLIER_FETCHING,
    SUPPLIER_SUCCESS,
    SUPPLIER_FAILED,
    SUPPLIER_CLEAR,
} from "../constants";
import swal from "sweetalert";
import { httpClient } from "./../utils/HttpClient";

export const setSupplierStateToFetching = () => ({
    type: SUPPLIER_FETCHING,
});

export const setSupplierStateToFailed = () => ({
    type: SUPPLIER_FAILED,
});
export const setSupplierStateToClear = () => ({
    type: SUPPLIER_CLEAR,
});
export const setSupplierStateToSuccess = (payload) => ({
    type: SUPPLIER_SUCCESS,
    payload,
});


export const Index = () => {
    return async (dispatch) => {
        dispatch(setSupplierStateToFetching());
        const response = await httpClient.get(
            process.env.REACT_APP_API_URL + "supplier"
        );
        if (response.data.result == "success") {
            // console.log(response.data);
            dispatch(setSupplierStateToSuccess(response.data.data));
        } else if (response.data.result === "error") {
            dispatch(setSupplierStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const Create = (values, history) => {
    return async (dispatch) => {
        dispatch(setSupplierStateToFetching());
        const response = await httpClient.post(
            process.env.REACT_APP_API_URL + "supplier",
            values
        );
        if (response.data.result == "success") {
            dispatch(setSupplierStateToSuccess(response.data));
            swal("Success!", response.data.message, "success").then((value) => {
                dispatch(setSupplierStateToClear());
                history.goBack();
                dispatch(Index());
            });
        } else if (response.data.result === "error") {
            dispatch(setSupplierStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const getSingleSupplier = (id) => {
    return async (dispatch) => {
        dispatch(setSupplierStateToFetching());
        const response = await httpClient.get(
            process.env.REACT_APP_API_URL + "supplier/" + id
        );
        if (response.data.result == "success") {
            dispatch(setSupplierStateToSuccess(response.data.data));
        } else if (response.data.result === "error") {
            dispatch(setSupplierStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const Update = (values, history) => {
    return async (dispatch) => {
        dispatch(setSupplierStateToFetching());
        const response = await httpClient.put(
            process.env.REACT_APP_API_URL + "supplier",
            values
        );
        if (response.data.result == "success") {
            dispatch(setSupplierStateToClear());
            history.goBack();
            dispatch(Index());
        } else if (response.data.result === "error") {
            dispatch(setSupplierStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const Remove = (id) => {

    return async (dispatch) => {
        console.log("remove");
        dispatch(setSupplierStateToFetching());
        const response = await httpClient.delete(
            process.env.REACT_APP_API_URL + "supplier/" + id
        );
        if (response.data.result == "success") {
            dispatch(setSupplierStateToSuccess());
            dispatch(Index());
        } else if (response.data.result === "error") {
            dispatch(setSupplierStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};