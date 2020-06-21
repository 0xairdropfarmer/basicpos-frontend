import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Recaptcha from "react-recaptcha";
import * as registerActions from "./../../actions/register.action";
import { useSelector, useDispatch } from "react-redux";
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "username is Too Short!")
    .max(50, "username is Too Long!")
    .required("username is Required"),
  recaptcha: Yup.string().required(),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Both password need to be the same"
  ),
});

export default (props) => {
  const dispatch = useDispatch();

  function showForm({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            className="form-control"
            placeholder="Username"
            className={
              errors.username && touched.username
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.fullname && touched.fullname ? (
            <small id="passwordHelp" class="text-danger">
              {errors.username}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={values.email}
            className={
              errors.email && touched.email
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder="Email"
          />
          {errors.email && touched.email ? (
            <small id="passwordHelp" class="text-danger">
              {errors.email}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className="form-control"
            placeholder="Password"
            className={
              errors.password && touched.password
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.password && touched.password ? (
            <small id="passwordHelp" class="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="confirm_password"
            onChange={handleChange}
            className={
              errors.confirm_password && touched.confirm_password
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder="Confirm Password"
          />
          {errors.confirm_password && touched.confirm_password ? (
            <small id="passwordHelp" class="text-danger">
              {errors.confirm_password}
            </small>
          ) : null}
        </div>
        <div className="form-group">
          <label>Recaptcha Validation</label>
          <Recaptcha
            sitekey={process.env.REACT_APP_RECAPCHA_KEY}
            render="explicit"
            theme="light"
            verifyCallback={(response) => {
              setFieldValue("recaptcha", response);
            }}
            onloadCallback={() => {
              console.log("done loading!");
            }}
          />
          {errors.recaptcha && touched.recaptcha && <p>{errors.recaptcha}</p>}
        </div>

        <div className="row">
          <div className="col-md-12">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-block btn-flat"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => {
                this.props.history.push("/login");
              }}
              className="btn btn-default btn-block btn-flat"
            >
              already member?
            </button>
          </div>
          {/* /.col */}
        </div>
      </form>
    );
  }

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">
            <b>Basic</b>POS
          </a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>

            <Formik
              initialValues={{
                fullname: "",
                email: "",
                password: "",
                confirm_password: "",
                recaptcha: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(registerActions.register(values, props.history));
                setSubmitting(false);
              }}
              validationSchema={SignupSchema}
            >
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
