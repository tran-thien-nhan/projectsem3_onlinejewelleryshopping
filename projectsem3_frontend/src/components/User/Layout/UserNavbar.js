import React from "react";
import "../../../asset/css/userstyle.css";
import "../../../asset/css/tiny-slider.css";
import userIcon from "../../../asset/images/user.svg";
import cartIcon from "../../../asset/images/cart.svg";
const UserNavbar = () => {
  return (
    <>
      <nav
        className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Furni navigation bar"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
          Jewelry Store<span>.</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsFurni"
            aria-controls="navbarsFurni"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link" href="/hello">
                  Shop
                </a>
              </li>
              <li>
                <a className="nav-link" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="nav-link" href="#">
                  Services
                </a>
              </li>
              <li>
                <a className="nav-link" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="nav-link" href="#">
                  Contact us
                </a>
              </li>
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              <li>
                <a className="nav-link" href="#">
                  <img src={userIcon} alt="User" />
                </a>
              </li>
              <li>
                <a className="nav-link" href="cart.html">
                  <img src={cartIcon} alt="Cart" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
