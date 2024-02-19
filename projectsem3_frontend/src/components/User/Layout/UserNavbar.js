import React, { useState, useEffect } from "react";
import "../../../asset/css/userstyle.css";
import userIcon from "../../../asset/images/user.svg";
import cartIcon from "../../../asset/images/cart.svg";
import NavbarDropdownItem from "./NavbarDropdownItem";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserNavbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    // Khi component được tạo, đặt ngôn ngữ theo giá trị đã lưu
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    } else {
      // Nếu không có ngôn ngữ đã lưu, đặt ngôn ngữ mặc định
      setSelectedLanguage(i18n.language);
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const handleLogout = async () => {
    sessionStorage.clear();
    Swal.fire(t("Success"), t("Logout successful!"), "success");
    setTimeout(() => {
      Swal.close();
      navigate("/login");
    }, 1000);

    // Wait for 1 second before reloading the page
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //window.location.reload();
  };

  return (
    <>
      <nav
        className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Furni navigation bar"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            {t("Jewelry Store")}
            <span>.</span>
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
                  {t("Home")}
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="/shop">
                  {t("Shop")}
                </a>
                {/* <button
                  type="button"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{ fontWeight: "bold" }}
                >
                  {t("Shop")}
                </button>
                <NavbarDropdownItem /> */}
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="/">
                  {t("Services")}
                </a>
                {/* <button
                  type="button"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{ fontWeight: "bold" }}
                >
                  {t("Services")}
                </button>
                <NavbarDropdownItem /> */}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  {t("Contact")}
                </a>
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
                    {t("Hello")} {sessionStorage.getItem("userName")}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item nav-link" href="/info">
                        {t("Info")}
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item nav-link" href="/order">
                        {t("Order")}
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item nav-link"
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                      >
                        {t("Log Out")}
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
              <li className="nav-item mt-2 px-4">
                <select
                  id="languageSelect"
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={i18n.language}
                >
                  <option value="">{t("Language")}</option>
                  <option value="en">{t("English")}</option>
                  <option value="vi">{t("Vietnamese")}</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
