import { httpClient } from "./../utils/HttpClient";
import swal from "sweetalert";
import { SHOP_UPDATE_ORDER, SHOP_UPDATE_PAYMENT, server } from "../constants";

const setStateShoptoUpdateOrder = (payload) => ({
  type: SHOP_UPDATE_ORDER,
  payload: payload,
});

const doUpdateOrder = (dispatch, orderLines) => {
  // debugger;
  let totalPrice = 0;
  let taxAmt = 0;
  for (let item of orderLines) {
    totalPrice += item.price * item.qty;
  }
  taxAmt = totalPrice * 0.07;

  dispatch(
    setStateShoptoUpdateOrder({
      orderLines,
      totalPrice,
      taxAmt,
    })
  );
};

export const addOrder = (item) => {
  return (dispatch, getState) => {
    let orderLines = getState().shopReducer.mOrderLines;
    let index = orderLines.indexOf(item);
    if (index === -1) {
      item.qty = 1;
      orderLines.unshift(item);
    } else {
      orderLines[index].qty++;
    }

    doUpdateOrder(dispatch, orderLines);
  };
};

export const removeOrder = (product) => {
  return (dispatch, getState) => {
    let orderLines = getState().shopReducer.mOrderLines;
    var foundIndex = orderLines.indexOf(product);

    orderLines.map((item) => {
      if (item.product_id === product.product_id) {
        item.qty = 1;
      }
    });
    orderLines.splice(foundIndex, 1);

    doUpdateOrder(dispatch, orderLines);
  };
};

export const submitPayment = (data) => {
  return (dispatch, getState) => {
    httpClient.post(server.ORDER_URL, data).then(() => {
      swal({
        title: "Your are made sale success",
        icon: "success",
        buttons: true,
      });
      getState().shopReducer.mOrderLines = [];
      dispatch({
        type: SHOP_UPDATE_PAYMENT,
        payload: {
          isPaymentMade: false,
          given: 0,
        },
      });
    });
  };
};

export const togglePaymentState = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SHOP_UPDATE_PAYMENT,
      payload: {
        isPaymentMade: !getState().shopReducer.mIsPaymentMade,
        given: !getState().shopReducer.mGiven,
      },
    });
  };
};
