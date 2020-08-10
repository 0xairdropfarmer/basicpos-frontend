import React, { Component } from "react";
import { Link } from "react-router-dom";
class Sidebar extends Component {
  render() {
    return (
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
              <li className="nav-item">
                <Link to="/posmachine" className="nav-link">
                  <i className="nav-icon fas fa-th" />
                  <p>Pos Machine</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/branch" className="nav-link">
                  <i className="nav-icon fas fa-building" />
                  <p>Branch</p>
                </Link>
              </li>
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
    );
  }
}

export default Sidebar;
