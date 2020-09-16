import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CredentialProvider,
  Guard,
  any,
  not,
  guardFactory,
  protect
} from "../react-guard/src";
import { NeedAdmin, NeedStaff } from "../requirements";
import { Roles } from '../../constants/'

export default () => {
  const [role, setRole] = useState([])
  const Admin = guardFactory(NeedAdmin);
  const Staff = guardFactory(NeedStaff);
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

    let { level } = JSON.parse(jsonPayload);
    let currentRole = Roles.find(e => e.credentials === level)
    setRole(currentRole)
  }
  return (
    <CredentialProvider value={role.credentials}>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="../../index3.html" className="brand-link">
          <span className="brand-text font-weight-light">BasicPOS</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </Link>
              </li>
              <Admin>
                <li className="nav-item">
                  <Link to="/posmachine" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>Pos Machine</p>
                  </Link>
                </li>
              </Admin>
              <Admin>
                <li className="nav-item">
                  <Link to="/branch" className="nav-link">
                    <i className="nav-icon fas fa-building" />
                    <p>Branch</p>
                  </Link>
                </li>
              </Admin>
              <li className="nav-item">
                <Link to="/product" className="nav-link">
                  <i className="nav-icon fas fa-truck" />
                  <p>Product</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/supplier" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>Supplier</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

    </CredentialProvider>
  )
}


