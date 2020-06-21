import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import Recaptcha from "react-recaptcha";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as loginActions from "../../actions/login.action";
import { server } from "../../constants";
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "username is Too Short!")
    .max(50, "username is Too Long!")
    .required("Username is Required"),
  recaptcha: Yup.string().required(),
  password: Yup.string().required("Password is required"),
});

const Login = (props) => {
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  const initilizeRecaptcha = async () => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    initilizeRecaptcha();
    if (localStorage.getItem(server.TOKEN_KEY) != null) {
      return props.history.push("/dashboard");
    }
    let notify = props.match.params["notify"];
    if (notify !== undefined) {
      if (notify == "error") {
        swal("Activation Fail please try again !", "", "error");
      } else if (notify == "success") {
        swal("Activation Success your can login !", "", "success");
      }
    }
  }, []);

  // function submitForm(values, history) {
  //   axios
  //     .post(process.env.REACT_APP_API_URL + "login", values)
  //     .then((res) => {
  //       if (res.data.result === "success") {
  //         localStorage.setItem("TOKEN_KEY", res.data.token);
  //         swal("Success!", res.data.message, "success").then((value) => {
  //           history.push("/dashboard");
  //         });
  //       } else if (res.data.result === "error") {
  //         swal("Error!", res.data.message, "error");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       return swal("Error!", error.message, "error");
  //     });
  // }
  const showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group input-group has-feedback">
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
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
          {errors.username && touched.username ? (
            <small id="passwordHelp" class="text-danger">
              {errors.username}
            </small>
          ) : null}
        </div>
        <div className="form-group input-group mb-3 has-feedback">
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
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
          {errors.password && touched.password ? (
            <small id="passwordHelp" class="text-danger">
              {errors.password}
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
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember Me</label>
            </div>
          </div>
          <div class="col-4">
            <button
              type="submit"
              disabled={isSubmitting}
              class="btn btn-primary btn-block"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div class="login-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">
            <b>Basic</b>POS
          </a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <Formik
              initialValues={{
                username: "",
                password: "",
                recaptcha: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(loginActions.login(values, props.history));
                setSubmitting(false);
              }}
              validationSchema={LoginSchema}
            >
              {/* {this.showForm()}            */}
              {(props) => showForm(props)}
            </Formik>
            <p class="mb-1">
              <Link to="/password/forgot">I forgot my password</Link>
            </p>
            <p class="mb-0">
              <Link to="/register">Register a new membership</Link>
            </p>
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
};

export default Login;
