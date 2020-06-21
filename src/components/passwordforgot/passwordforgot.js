import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Recaptcha from "react-recaptcha";
import * as passwordForgotAction from "./../../actions/forgotpassword.action";
import { useDispatch } from "react-redux";
const PasswordForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  recaptcha: Yup.string().required(),
});

export default (props) => {
  const dispatch = useDispatch();
  const initilizeRecaptcha = async () => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };
  React.useEffect(() => {
    initilizeRecaptcha();
  }, []);
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
            <label htmlFor="email">Email address</label>
            <input
              onChange={handleChange}
              value={values.email}
              type="email"
              className={
                errors.email && touched.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="email"
              placeholder="Enter email"
            />
            {errors.email && touched.email ? (
              <small id="passwordHelp" class="text-danger">
                {errors.email}
              </small>
            ) : null}
          </div>
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

        <div class="row">
          <div class="col-12">
            <button
              type="submit"
              disable={isSubmitting}
              class="btn btn-primary btn-block"
            >
              Request new password
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
              You forgot your password? Here you can easily retrieve a new
              password.
            </p>
            <Formik
              initialValues={{
                email: "",
                recaptcha: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(
                  passwordForgotAction.forgotpassword(values, props.history)
                );
                setSubmitting(false);
              }}
              validationSchema={PasswordForgotSchema}
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
