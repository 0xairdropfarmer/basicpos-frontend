import React, { useState, useEffect } from "react";
import * as productActions from "../../actions/product.action";
import { server } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
export default (props) => {
  const productReducer = useSelector(({ productReducer }) => productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }
    dispatch(productActions.Index());
  }, []);

  function confirmDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(productActions.Remove(id));
        swal("Poof! Your Branch data has been deleted!", {
          icon: "success",
        });
      }
    });
  }
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Product Data</h1>
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
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-tools">
                    <div className="input-group input-group-sm">
                      <Link to="/product/create">
                        <button type="submit" className="btn btn-default">
                          <i className="fas fa-plus" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>Product Image</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Created Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productReducer.result ? (
                        productReducer.result.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <img
                                  class="img-fluid img-rounded"
                                  width={200}
                                  src={
                                    process.env.REACT_APP_PRODUCT_IMAGE_PATH +
                                    "/" +
                                    data.image
                                  }
                                />
                              </td>
                              <td>{data.name}</td>
                              <td>{data.stock}</td>
                              <td>{data.price}</td>
                              <td>{data.created}</td>
                              <td>
                                <Link
                                  to={"/product/update/" + data._id}
                                  onClick={() =>
                                    dispatch(productActions.clearState())
                                  }
                                >
                                  Edit
                                </Link>
                                {" | "}
                                <Link onClick={() => confirmDelete(data._id)}>
                                  Delete
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          {" "}
                          <td> No data </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
