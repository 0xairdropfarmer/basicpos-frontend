import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as supplierActions from "../../actions/supplier.action";
import * as Yup from "yup";
import { server } from "../../constants";
const Create_Schema = Yup.object().shape({
    name: Yup.string()
        .min(2, "name is Too Short!")
        .max(50, "name is Too Long!")
        .required("name is Required"),
    address: Yup.string().required(),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is Required"),
    tel: Yup.string().required("Telephone number is required"),
    vat: Yup.string().required("VAT number is required"),
});
export default (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(server.TOKEN_KEY) === null) {
            return props.history.push("/login");
        }

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
            <form role="form" onSubmit={handleSubmit}>
                <div class="card-body">
                    <div class="row">
                        <div className="form-group col-md-6 input-group has-feedback">
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                                className="form-control"
                                placeholder="Supplier Name"
                                className={
                                    errors.name && touched.name
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                            {errors.name && touched.name ? (
                                <small id="passwordHelp" class="text-danger">
                                    {errors.name}
                                </small>
                            ) : null}
                        </div>
                    </div>
                    <div class="row">
                        <div className="form-group col-md-8 input-group has-feedback">
                            <textarea
                                name="address"
                                onChange={handleChange}
                                value={values.address}
                                className="form-control"
                                placeholder="Supplier Address"
                                className={
                                    errors.address && touched.address
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                            ></textarea>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-building"></span>
                                </div>
                            </div>
                            {errors.address && touched.address ? (
                                <small id="passwordHelp" class="text-danger">
                                    {errors.address}
                                </small>
                            ) : null}
                        </div>
                    </div>
                    <div className="form-group input-group has-feedback">
                        <input
                            type="text"
                            name="tel"
                            onChange={handleChange}
                            value={values.tel}
                            className="form-control"
                            placeholder="Supplier Telephone"
                            className={
                                errors.tel && touched.tel
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                        />
                        {errors.tel && touched.tel ? (
                            <small id="passwordHelp" class="text-danger">
                                {errors.tel}
                            </small>
                        ) : null}
                    </div>
                    <div class="row">
                        <div className="form-group col-md-6 input-group has-feedback">
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                className="form-control "
                                placeholder="Supplier E-mail"
                                className={
                                    errors.email && touched.email
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                            {errors.email && touched.email ? (
                                <small id="passwordHelp" class="text-danger">
                                    {errors.email}
                                </small>
                            ) : null}
                        </div>
                    </div>
                    <div class="row">
                        <div className="form-group col-md-6 input-group has-feedback">
                            <input
                                type="text"
                                name="vat"
                                onChange={handleChange}
                                value={values.vat}
                                className="form-control"
                                placeholder="Supplier Vat Number"
                                className={
                                    errors.vat && touched.vat
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                            {errors.vat && touched.vat ? (
                                <small id="passwordHelp" class="text-danger">
                                    {errors.vat}
                                </small>
                            ) : null}
                        </div>

                    </div>
                    <div class="row">
                        <div class="offset-md-1 col-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                class="btn btn-primary btn-block"
                            >
                                Add
                             </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">

                            <h1 className="m-0 text-dark">Create Supplier</h1>
                        </div>
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </div>
            <div className="content">
                <div class="card card-success">
                    <div class="card-header">

                    </div>


                    <Formik
                        initialValues={{
                            name: "",
                            address: "",
                            tel: '',

                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values)
                            dispatch(supplierActions.Create(values, props.history));
                            setSubmitting(false);
                        }}
                        validationSchema={Create_Schema}
                    >
                        {/* {this.showForm()}            */}
                        {(props) => showForm(props)}
                    </Formik>
                </div>
                {/* /.card */}
            </div>
        </div>
    );
};
