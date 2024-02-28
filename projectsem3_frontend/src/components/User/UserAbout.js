import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useData } from "../../Context/DataContext";

const UserAbout = () => {
  const { items, userList, loading, error } = useData();
  const { t, i18n } = useTranslation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const thisUser = userList.find(
  //     (user) => user.userID === sessionStorage.getItem("userID")
  //   );

  //   if(thisUser === undefined){
  //     sessionStorage.clear();
  //     // navigate("/login");
  //   }
  // }, []);
  return (
    <div
      className="container my-4 justify-content-center align-items-center text-center"
      style={{ paddingTop: "10rem", paddingBottom: "10rem" }}
    >
      <h1 style={{ marginBottom: "20px", color: "#333" }}>{t("About Us")}</h1>
      <p style={{ fontSize: "18px", lineHeight: "1.5", color: "#666" }}>
        {t(
          "Welcome to our website! We are dedicated to providing you with the best products and services."
        )}
      </p>
      <p style={{ fontSize: "18px", lineHeight: "1.5", color: "#666" }}>
        {t(
          "Our team is comprised of passionate individuals who strive to deliver excellence in everything we do."
        )}
      </p>
      <p style={{ fontSize: "18px", lineHeight: "1.5", color: "#666" }}>
        {t(
          "Feel free to explore our website and don't hesitate to contact us if you have any questions or inquiries."
        )}
      </p>
      <div
        className="container my-4 d-flex justify-content-center align-items-center"
        style={{
          margin: "auto",
        }}
      >
        <img
          src="https://cdn.vietnambiz.vn/2019/11/21/shared-office-spaces-157432625659639056148.jpg"
          alt="banner"
          style={{ width: "50%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default UserAbout;
