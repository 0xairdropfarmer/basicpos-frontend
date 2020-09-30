import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: 55
  },
  star: {
    color: "red"
  },
  orderList: {
    overflowX: "hidden",
    height: 490,
    flex: 1,
    width: "100%",
    maxHeight: 490
  },
  orderListItem: {
    height: 100,
    maxHeight: 100
  },
  productContainer: {
    height: 720
  },
  paymentButton: {
    height: 95,
    marginTop: 24
  },
  leftLabel: {
    marginLeft: 20
  },
  rightLabel: {
    marginRight: 20
  }
}));
