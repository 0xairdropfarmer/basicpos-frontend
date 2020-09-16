import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { withRouter, Link } from "react-router-dom";
import { server } from "../../constants";
export default () => {
  const [role, setRole] = useState("")
  const [username, setUsername] = useState("")
  useEffect(() => {
    getcurrentRole()
  }, [])
  const getcurrentRole = () => {
    let token = localStorage.getItem("token");
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    let { level, username } = JSON.parse(jsonPayload);

    setUsername(username)
    setRole(level)
  }
  const Logout = (e) => {
    swal("Are your sure SignOut?", {
      buttons: {
        nope: {
          text: "Let me back",
          value: "nope",
        },
        sure: {
          text: "I'm, Sure",
          value: "sure",
        },
      },
    }).then((value) => {
      switch (value) {
        case "sure":
          swal(" SignOut Successfully", "success").then((val) => {
            localStorage.removeItem(server.TOKEN_KEY);
            return this.props.history.push("/login");
          });
          break;
        case "nope":
          swal("Ok", "success");
          break;
        default:
          swal("Got away safely!");
      }
    });
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="../../index3.html" className="nav-link">
            Home
            </a>
        </li>
      </ul>
      {/* SEARCH FORM */}
      <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-navbar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Messages Dropdown Menu */}
        {/* Notifications Dropdown Menu */}

        <li className="nav-item dropdown">

          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-user" /> Hello,{role} {username}
          </a>

          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">menu</span>
            <div className="dropdown-divider" />
            <Link to="/profile" className="dropdown-item">
              <i className="fas fa-user-alt mr-2" /> Update Profile
              </Link>
            <div className="dropdown-divider" />
            <a
              href="javascript:;"
              onClick={() => this.Logout()}
              className="dropdown-item"
            >
              <i className="fas fa-sign-out-alt mr-2" /> Logout
              </a>
          </div>
        </li>
      </ul>
    </nav>
  );

}
