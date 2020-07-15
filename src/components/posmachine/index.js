import React, { useState, useEffect } from "react";
import * as posmachineActions from "../../actions/posmachine.action";
import { server } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
export default (props) => {
    const posmachineReducer = useSelector(
        ({ posmachineReducer }) => posmachineReducer
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem(server.TOKEN_KEY) === null) {
            return props.history.push("/login");
        }
        dispatch(posmachineActions.index());
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
                dispatch(posmachineActions.remove(id));
                swal("Poof! Your POS Machine data has been deleted!", {
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
                            <h1 className="m-0 text-dark">Pos Machine Data</h1>
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
                                    <h3 className="card-title"></h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm">
                                            <Link to="/posmachine/create">
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
                                                <th>Alias</th>
                                                <th>Serial Name</th>
                                                <th>Created Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posmachineReducer.result ? (
                                                posmachineReducer.result.map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{data.alias}</td>
                                                            <td>{data.serial_number}</td>
                                                            <td>{data.created}</td>
                                                            <td>
                                                                <Link to={"/posmachine/update/" + data._id}>
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
                                                    <td> No data </td>
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