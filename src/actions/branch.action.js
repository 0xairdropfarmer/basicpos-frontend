import {
    BRANCH_FETCHING,
    BRANCH_SUCCESS,
    BRANCH_FAILED,
    BRANCH_CLEAR, FETCHOPTION_SUCCESS
} from "../constants";
import swal from "sweetalert";
import { httpClient } from "./../utils/HttpClient";

export const setBranchStateToFetching = () => ({
    type: BRANCH_FETCHING,
});

export const setBranchStateToFailed = () => ({
    type: BRANCH_FAILED,
});
export const setBranchStateToClear = () => ({
    type: BRANCH_CLEAR,
});
export const setBranchStateToSuccess = (payload) => ({
    type: BRANCH_SUCCESS,
    payload,
});
export const setFetchOptionStateToSuccess = (payload) => ({
    type: FETCHOPTION_SUCCESS,
    payload,
});

export const Index = () => {
    return async (dispatch) => {
        dispatch(setBranchStateToFetching());
        const response = await httpClient.get(
            process.env.REACT_APP_API_URL + "branch"
        );
        if (response.data.result == "success") {
            // console.log(response.data);
            dispatch(setBranchStateToSuccess(response.data.data));
        } else if (response.data.result === "error") {
            dispatch(setBranchStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const getDropdownPOS = () => {
    return async (dispatch) => {
        dispatch(setBranchStateToFetching());
        const response = await httpClient.get(
            process.env.REACT_APP_API_URL + "branch_getpos"
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
            dispatch(setBranchStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const getSingleBranch = (id) => {
    return async (dispatch) => {
        dispatch(setBranchStateToFetching());
        const response = await httpClient.get(
            process.env.REACT_APP_API_URL + "branch/" + id
        );

        if (response.data.result == "success") {
            dispatch(getDropdownPOS()).then(() => {
                dispatch(setBranchStateToSuccess(response.data.data));
            })

        } else if (response.data.result === "error") {
            dispatch(setBranchStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const Create = (values, history) => {
    return async (dispatch) => {
        dispatch(setBranchStateToFetching());
        const response = await httpClient.post(
            process.env.REACT_APP_API_URL + "branch",
            values
        );
        if (response.data.result == "success") {
            dispatch(setBranchStateToSuccess(response.data));
            swal("Success!", response.data.message, "success").then((value) => {
                dispatch(setBranchStateToClear());
                history.goBack();
                dispatch(Index());
            });
        } else if (response.data.result === "error") {
            dispatch(setBranchStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const Update = (values, history) => {
    return async (dispatch) => {
        dispatch(setBranchStateToFetching());
        const response = await httpClient.put(
            process.env.REACT_APP_API_URL + "branch",
            values
        );
        if (response.data.result == "success") {
            dispatch(setBranchStateToClear());
            history.goBack();
            dispatch(Index());
        } else if (response.data.result === "error") {
            dispatch(setBranchStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const Remove = (id) => {

    return async (dispatch) => {
        console.log("remove");
        dispatch(setBranchStateToFetching());
        const response = await httpClient.delete(
            process.env.REACT_APP_API_URL + "branch/" + id
        );
        if (response.data.result == "success") {
            dispatch(setBranchStateToSuccess());
            dispatch(Index());
        } else if (response.data.result === "error") {
            dispatch(setBranchStateToFailed());
            swal("Error!", response.data.message, "error");
        }
    };
};
export const clearState = () => {
    return dispatch => {
        dispatch(setBranchStateToClear())
    }
}