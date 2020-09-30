import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionRequest } from "./transaction";
import * as shopActions from "../../actions/shop.action";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

export default (props) => {
  const shopReducer = useSelector(({ shopReducer }) => shopReducer);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: 30,
    },
    button: {
      height: 100,
      fontSize: 20,
    },
    field: {
      marginTop: 16,
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
      <Form>
        {isMustChanged(values) && (
          <Field
            variant="outlined"
            className={classes.field}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            component={TextField}
            name="change"
            type="text"
            label="Change"
            InputProps={{
              style: { fontSize: 35 },
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">THB</InputAdornment>
              ),
            }}
          />
        )}

        <Field
          readonly
          variant="outlined"
          className={classes.field}
          fullWidth
          component={TextField}
          name="given"
          type="text"
          label="Given"
          InputProps={{
            style: { fontSize: 35, color: "green" },
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">THB</InputAdornment>
            ),
          }}
        />

        <div style={{ marginTop: 32 }}>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(1000, values.given, setFieldValue)}
              >
                ฿1,000
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(500, values.given, setFieldValue)}
              >
                ฿500
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(100, values.given, setFieldValue)}
              >
                ฿100
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(50, values.given, setFieldValue)}
              >
                ฿50
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(20, values.given, setFieldValue)}
              >
                ฿20
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(10, values.given, setFieldValue)}
              >
                ฿10
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="danger"
                onClick={() => setFieldValue("given", 0)}
              >
                CLR
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickExact(setFieldValue)}
              >
                EXACT
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.button}
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => onClickSubmit(values)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Form>
    );
  };

  return (
    <div className={classes.root}>
      <Formik initialValues={{ given: 0 }}>{(props) => showForm(props)}</Formik>
    </div>
  );
};
