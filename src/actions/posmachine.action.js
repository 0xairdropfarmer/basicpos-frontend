import {
  POSMACHINE_FETCHING,
  POSMACHINE_SUCCESS,
  POSMACHINE_FAILED,
  POSMACHINE_CLEAR,
} from "../constants";
import swal from "sweetalert";
import { httpClient } from "./../utils/HttpClient";

export const setPOSMachineStateToFetching = () => ({
  type: POSMACHINE_FETCHING,
});

export const setPOSMachineStateToFailed = () => ({
  type: POSMACHINE_FAILED,
});
export const setPOSMachineStateToClear = () => ({
  type: POSMACHINE_CLEAR,
});
export const setPOSMachineStateToSuccess = (payload) => ({
  type: POSMACHINE_SUCCESS,
  payload,
});
export const clearState = () => {
  return dispatch => {
    dispatch(setPOSMachineStateToClear())
  }
}
export const index = () => {
  return async (dispatch) => {
    dispatch(setPOSMachineStateToFetching);
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + "pos_machine"
    );
    if (response.data.result == "success") {
      // console.log(response.data);
      dispatch(setPOSMachineStateToSuccess(response.data.data));
    } else if (response.data.result === "error") {
      dispatch(setPOSMachineStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const getPosMachineById = (id) => {
  return async (dispatch) => {
    dispatch(setPOSMachineStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + "pos_machine/" + id
    );
    if (response.data.result == "success") {
      dispatch(setPOSMachineStateToSuccess(response.data.data));
    } else if (response.data.result === "error") {
      dispatch(setPOSMachineStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};

export const create = (values, history) => {
  return async (dispatch) => {
    dispatch(setPOSMachineStateToFetching());
    const response = await httpClient.post(
      process.env.REACT_APP_API_URL + "pos_machine",
      values
    );
    if (response.data.result == "success") {
      dispatch(setPOSMachineStateToSuccess(response.data));
      swal("Success!", response.data.message, "success").then((value) => {
        dispatch(setPOSMachineStateToClear());
        history.goBack();
        dispatch(index());
      });
    } else if (response.data.result === "error") {
      dispatch(setPOSMachineStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const update = (values, history) => {
  return async (dispatch) => {
    dispatch(setPOSMachineStateToFetching());
    const response = await httpClient.put(
      process.env.REACT_APP_API_URL + "pos_machine",
      values
    );
    if (response.data.result == "success") {
      dispatch(setPOSMachineStateToClear());
      history.goBack();
      dispatch(index());
    } else if (response.data.result === "error") {
      dispatch(setPOSMachineStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const inline_update = (values, history) => {
  return async (dispatch) => {
    // dispatch(setPOSMachineStateToFetching());
    const response = await httpClient.put(
      process.env.REACT_APP_API_URL + "pos_machine/inline_update",
      values
    );
    if (response.data.result == "success") {
      // dispatch(setPOSMachineStateToClear());
    } else if (response.data.result === "error") {
      // dispatch(setPOSMachineStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const remove = (id) => {
  console.log(id);
  return async (dispatch) => {
    console.log("remove");
    dispatch(setPOSMachineStateToFetching());
    const response = await httpClient.delete(
      process.env.REACT_APP_API_URL + "pos_machine/" + id
    );
    if (response.data.result == "success") {
      dispatch(setPOSMachineStateToSuccess());
      dispatch(index());
    } else if (response.data.result === "error") {
      dispatch(setPOSMachineStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const bulk_delete = (id) => {
  console.log(id);
  return async (dispatch) => {
    console.log("remove");
    dispatch(setPOSMachineStateToFetching());
    const response = await httpClient.delete(
      process.env.REACT_APP_API_URL + "pos_machine/bulk_delete/" + id
    );
    if (response.data.result == "success") {
      dispatch(setPOSMachineStateToSuccess());
      dispatch(index());
    } else if (response.data.result === "error") {
      dispatch(setPOSMachineStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
