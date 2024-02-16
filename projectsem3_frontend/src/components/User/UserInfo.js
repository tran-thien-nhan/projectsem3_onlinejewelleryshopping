import React from "react";
import { useTranslation } from "react-i18next";

const UserInfo = () => {
  const { t, i18n } = useTranslation();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {sessionStorage.getItem("fname")} {sessionStorage.getItem("lname")}
          </h5>
          <p className="card-text">
            {t("Username")}: {sessionStorage.getItem("userName")}
          </p>
          <p className="card-text">
            {t("Email")}: {sessionStorage.getItem("email")}
          </p>
          <p className="card-text">
            {t("Address")}: {sessionStorage.getItem("address")}
          </p>
          <p className="card-text">
            {t("City")}: {sessionStorage.getItem("city")}
          </p>
          <p className="card-text">
            {t("Mobile Number")}: {sessionStorage.getItem("mobNo")}
          </p>
          <p className="card-text">
            {t("Date of Birth")}: {formatDate(sessionStorage.getItem("dob"))}
          </p>
        </div>
      </div>
      <div className="d-flex">
        <a href="/updateuser" className="btn btn-primary my-3 mx-2">
          {t("Update")}
        </a>
        <a href="/updateuserpass" className="btn btn-primary my-3">
          {t("Update Password")}
        </a>
      </div>
    </div>
  );
};

export default UserInfo;
