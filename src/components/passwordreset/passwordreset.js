import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import * as passwordReset from "./../../actions/resetpassword.action";
import { useDispatch } from "react-redux";
const PasswordresetSchema = Yup.object().shape({
  password: Yup.string().required("New Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Both password need to be the same"
  ),
});

export default (props) => {
  const dispatch = useDispatch();

  const showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    onSubmit,
    isSubmitting,
    setFieldValue,
  }) => {
    return (
      <form role="form" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group  has-feedback">
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              onChange={handleChange}
              value={values.password}
              type="password"
              className={
                errors.password && touched.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="password"
              placeholder="Enter new password"
            />
            {errors.password && touched.password ? (
              <small id="passwordHelp" class="text-danger">
                {errors.password}
              </small>
            ) : null}
          </div>
          <div className="form-group  has-feedback">
            <label htmlFor="password">Confirm Password:</label>

            <input
              onChange={handleChange}
              value={values.confirm_password}
              type="password"
              className={
                errors.confirm_password && touched.confirm_password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="confirm_password"
              name="confirm_password  "
              placeholder="Enter password again"
            />
            {errors.confirm_password && touched.confirm_password ? (
              <small id="passwordHelp" class="text-danger">
                {errors.confirm_password}
              </small>
            ) : null}
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <button
              type="submit"
              disabled={isSubmitting}
              class="btn btn-primary btn-block"
            >
              Save new password
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="#">
            <b>Basic</b>POS
          </a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              You are only one step a way from your new password, recover your
              password now.
            </p>
            <Formik
              initialValues={{
                password: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(
                  passwordReset.resetpassword(
                    values,
                    props.history,
                    props.match.params["token"]
                  )
                );
                setSubmitting(true);
              }}
              validationSchema={PasswordresetSchema}
            >
              {/* {this.showForm()}            */}
              {(props) => showForm(props)}
            </Formik>
            <p className="mb-0">
              <Link to="/login">Login</Link>
            </p>

            <p className="mb-0">
              <Link to="/register">Register a new membership</Link>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
};
