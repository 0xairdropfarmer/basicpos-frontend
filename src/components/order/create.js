import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Payment from "./payment";
import * as productActions from "../../actions/product.action";
import * as shopActions from "../../actions/shop.action";
import NumberFormat from "react-number-format";

import cashier from "./cashier.png";
export default (props) => {
  const shopReducer = useSelector(({ shopReducer }) => shopReducer);
  const productReducer = useSelector(({ productReducer }) => productReducer);
  const dispatch = useDispatch();

  const renderPayment = () => {
    return (
      <div className="col-md-8" style={{ maxHeight: 710 }}>
        <Payment order={JSON.stringify(shopReducer.mOrderLines)} />
      </div>
    );
  };
  const renderOrder = () => {
    const { mOrderLines } = shopReducer;

    console.log("mOrderLines", mOrderLines);
    mOrderLines.map((item) => {
      return (
        <td>
          <tr>{item.image}</tr>
          <tr>{item.name}</tr>
          <tr>{item.price}</tr>
        </td>
      );
    });
  };
  const isSelectedItem = (product) => {
    let index = shopReducer.mOrderLines.indexOf(product);
    return index !== -1;
  };
  const CartSection = (index) => {
    return (
      <>
        <div className="row">
          <h4>Tax</h4>
          <NumberFormat
            value={shopReducer.mTaxAmt}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </div>
        <div className="row">
          <h4>Total</h4>
          <NumberFormat
            value={shopReducer.mTotalPrice}
            displayType={"text"}
            decimalScale={2}
            thousandSeparator={true}
            prefix={"฿"}
          />
          {shopReducer.mTotalPrice > 0 && !shopReducer.mIsPaymentMade && (
            <a
              href="#"
              class="btn btn-primary btn-block"
              onClick={() => dispatch(shopActions.togglePaymentState())}
            >
              Payment
            </a>
          )}
          {shopReducer.mOrderLines.length > 0 ? (
            <table class="table table-hover shopping-cart-wrap">
              <thead class="text-muted">
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col" width="120">
                    Qty
                  </th>
                  <th scope="col" width="120">
                    Price
                  </th>
                  <th scope="col" class="text-right" width="200">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>{renderOrder()}</tbody>
            </table>
          ) : (
            <img src={cashier} style={{ height: 300, width: 300 }} />
          )}
        </div>
      </>
    );
  };
  const addToCart = (e, item) => {
    // function upvote
    e.preventDefault();
    return dispatch(shopActions.addOrder(item));
  };
  const renderProductRows = () => {
    if (productReducer.result) {
      //console.log(productReducer.result);
      const { result } = productReducer;
      return (
        <div className="row">
          {result &&
            result.map((item, index) => {
              return (
                <>
                  {index % 3 === 0 && <div class="w-100 d-lg-none mt-4"></div>}
                  <div class="col-md-6 col-lg-4 col-xl-3 py-2">
                    <div className="card h-100">
                      <img
                        className="card-img-top img-fluid"
                        src={
                          process.env.REACT_APP_PRODUCT_IMAGE_PATH +
                          "/" +
                          item.image
                        }
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h4 className="card-title">{item.name}</h4>
                        <p className="card-text">Price {item.price}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            remain {item.stock}
                          </small>
                          {isSelectedItem(item) && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <small className="text-muted">X{item.qty}</small>
                            </div>
                          )}
                        </p>
                        <a
                          href="//#region "
                          onClick={(e, item) => addToCart(e, item)}
                          class="btn btn-primary btn-block "
                        >
                          Add to Card
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      );
    } else {
      return "loading...";
    }
  };

  useEffect(() => {
    dispatch(productActions.Index());
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Sales Page</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-9"
              data-spy="scroll"
              data-target=".navbar"
              data-offset="50"
            >
              {renderProductRows()}
            </div>
            <div className="col-3">{CartSection()}</div>
          </div>
        </div>
      </section>
    </div>
  );
};
