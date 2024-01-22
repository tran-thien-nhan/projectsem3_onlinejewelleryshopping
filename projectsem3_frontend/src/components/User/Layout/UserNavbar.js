import React, { useState, useEffect } from "react";
import "../../../asset/css/userstyle.css";
import userIcon from "../../../asset/images/user.svg";
import cartIcon from "../../../asset/images/cart.svg";
import NavbarDropdownItem from "./NavbarDropdownItem";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    // Remove login information from session
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("fname");
    sessionStorage.removeItem("lname");
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("city");
    sessionStorage.removeItem("mobNo");      
    sessionStorage.removeItem("dob");    

    Swal.fire("Success", "Logout successful!", "success");
    setTimeout(() => {
      Swal.close();
      navigate("/login");
    }, 1000);

    // Wait for 1 second before reloading the page
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  };

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
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{ fontWeight: "bold" }}
                >
                  Shop
                </button>
                <NavbarDropdownItem />
              </li>
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{ fontWeight: "bold" }}
                >
                  Services
                </button>
                <NavbarDropdownItem />
              </li>
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              {sessionStorage.getItem("email") === null &&
              sessionStorage.getItem("password") === null ? (
                <li className="nav-item dropdown">
                  <a className="nav-link" href="/login">
                    <img src={userIcon} alt="user" />
                  </a>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <button
                    type="button"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={{ fontWeight: "bold" }}
                  >
                    {/* <img src={userIcon} alt="user" /> */}
                    hello {sessionStorage.getItem("fname")} {sessionStorage.getItem("lname")} 
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item nav-link" href="/info">
                        Info
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item nav-link" href="*">
                        Order
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item nav-link"
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                      >
                        Log Out
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              <li>
                <a className="nav-link" href="/cart">
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
