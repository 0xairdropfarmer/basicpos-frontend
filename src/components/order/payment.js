import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionRequest } from "./transaction";
import * as shopActions from "../../actions/shop.action";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";

export default (props) => {
  const shopReducer = useSelector(({ shopReducer }) => shopReducer);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    navbar_inner: { borderRadius: "0 0 0 0" },
    calculator_wrapper: { fontSize: "42px" },
    calculator_wrapper__uneditable_input: {
      height: "42px",
      fontSize: "42px",
      lineHeight: "35px",
      width: "100%",
    },
    calculator_wrapper__span1: { height: "42px", fontSize: "42px" },
    calculator_wrapper__span1__visible_phone: { lineHeight: "25px" },
    calculator_wrapper__span1__hidden_phone: { lineHeight: "42px" },
    btn: {
      width: "10%",
      height: "50px",
      margin: "0 5px 5px 0",
      lineHeight: "50px",
      fontWeight: "bold",
      fontSize: "25px",
    },
  }));

  const classes = useStyles();

  const isMustChanged = (values) => {
    try {
      return values.given > shopReducer.mTotalPrice;
    } catch (err) {
      return false;
    }
  };

  const updateChange = (given, setFieldValue) => {
    let change = given - shopReducer.mTotalPrice;
    if (change > 0) {
      setFieldValue("change", change);
    } else {
      setFieldValue("change", 0);
    }
  };

  const onClickGiven = (newValue, oldValue, setFieldValue) => {
    const newGiven = newValue + oldValue;
    setFieldValue("given", newGiven);
    updateChange(newGiven, setFieldValue);
  };

  const onClickExact = (setFieldValue) => {
    setFieldValue("given", shopReducer.mTotalPrice);
    updateChange(0, setFieldValue);
  };

  const onClickSubmit = (values) => {
    let trans = new TransactionRequest();
    trans.total = shopReducer.mTotalPrice;
    trans.paid = values.given;
    trans.change = values.change;
    trans.payment_type = "cash";
    trans.payment_detail = "full";
    trans.seller_id = "sr0001";
    trans.buyer_id = "by0000";
    trans.order_list = props.order;
    dispatch(shopActions.submitPayment(trans));
  };

  const showForm = ({ values, setFieldValue }) => {
    return (
      <div className="row-fluid">
        <div className="span6 well">
          <div id="calc-board">
            <div className="row-fluid">
              <a href="#" className="btn" data-constant="SIN" data-key={115}>
                sin
              </a>
              <a href="#" className="btn" data-constant="COS" data-key={99}>
                cos
              </a>
              <a href="#" className="btn" data-constant="MOD" data-key={109}>
                md
              </a>
              <a
                href="#"
                className="btn btn-danger"
                data-method="reset"
                data-key={8}
              >
                C
              </a>
            </div>
            <div className="row-fluid">
              <a href="#" className="btn" data-key={55}>
                7
              </a>
              <a href="#" className="btn" data-key={56}>
                8
              </a>
              <a href="#" className="btn" data-key={57}>
                9
              </a>
              <a href="#" className="btn" data-constant="BRO" data-key={40}>
                (
              </a>
              <a href="#" className="btn" data-constant="BRC" data-key={41}>
                )
              </a>
            </div>
            <div className="row-fluid">
              <a href="#" className="btn" data-key={52}>
                4
              </a>
              <a href="#" className="btn" data-key={53}>
                5
              </a>
              <a href="#" className="btn" data-key={54}>
                6
              </a>
              <a href="#" className="btn" data-constant="MIN" data-key={45}>
                -
              </a>
              <a href="#" className="btn" data-constant="SUM" data-key={43}>
                +
              </a>
            </div>
            <div className="row-fluid">
              <a href="#" className="btn" data-key={49}>
                1
              </a>
              <a href="#" className="btn" data-key={50}>
                2
              </a>
              <a href="#" className="btn" data-key={51}>
                3
              </a>
              <a href="#" className="btn" data-constant="DIV" data-key={47}>
                /
              </a>
              <a href="#" className="btn" data-constant="MULT" data-key={42}>
                *
              </a>
            </div>
            <div className="row-fluid">
              <a href="#" className="btn" data-key={46}>
                .
              </a>
              <a href="#" className="btn" data-key={48}>
                0
              </a>
              <a href="#" className="btn" data-constant="PROC" data-key={37}>
                %
              </a>
              <a
                href="#"
                className="btn btn-primary"
                data-method="calculate"
                data-key={61}
              >
                =
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Formik initialValues={{ given: 0 }}>{(props) => showForm(props)}</Formik>
    </div>
  );
};
