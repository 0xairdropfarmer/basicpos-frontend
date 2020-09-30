import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as posmachineActions from "../../actions/posmachine.action";
import { server } from "../../constants";

export default (props) => {
    const dispatch = useDispatch();
    const posmachineReducer = useSelector(
        ({ posmachineReducer }) => posmachineReducer
    );
    useEffect(() => {
        if (localStorage.getItem(server.TOKEN_KEY) === null) {
            return props.history.push("/login");
        }
        const { id } = props.match.params;

        dispatch(posmachineActions.getPosMachineById(id));
    }, []);

    const showForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
    }) => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group input-group has-feedback">
                    <input
                        type="hidden"
                        name="_id"
                        onChange={handleChange}
                        value={values._id}
                    />
                    <input
                        type="text"
                        name="alias"
                        onChange={handleChange}
                        value={values.alias}
                        className="form-control"
                        placeholder="POS Machine Alias Name"
                        className={
                            errors.alias && touched.alias
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                    />
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-user"></span>
                        </div>
                    </div>
                    {errors.alias && touched.alias ? (
                        <small id="passwordHelp" class="text-danger">
                            {errors.alias}
                        </small>
                    ) : null}
                </div>
                <div className="form-group input-group has-feedback">
                    <input
                        type="text"
                        name="serial_number"
                        onChange={handleChange}
                        value={values.serial_number}
                        className="form-control"
                        placeholder="Serial Number"
                        className={
                            errors.serial_number && touched.serial_number
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                    />
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-user"></span>
                        </div>
                    </div>
                    {errors.serial_number && touched.serial_number ? (
                        <small id="passwordHelp" class="text-danger">
                            {errors.serial_number}
                        </small>
                    ) : null}
                </div>
                <div class="row">
                    <div class="offset-md-8 col-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            class="btn btn-primary btn-block"
                        >
                            Add
            </button>
                    </div>
                </div>
            </form>
        );
    };

    return (
        <div class="login-page">
            <div className="register-box">
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Update Pos Machine Data</p>

                        <Formik
                            enableReinitialize={true}
                            initialValues={
                                posmachineReducer.result
                                    ? posmachineReducer.result
                                    : { alias: "", serial_number: "" }
                            }
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);
                                dispatch(posmachineActions.update(values, props.history));
                                setSubmitting(false);
                            }}
                        // validationSchema={Create_Schema}
                        >
                            {/* {this.showForm()}            */}
                            {(props) => showForm(props)}
                        </Formik>
                    </div>
                    {/* /.form-box */}
                </div>
                {/* /.card */}
            </div>
        </div>
    );
};