import React from "react";
import { useTranslation } from "react-i18next";

const UserAbout = () => {
  const { t, i18n } = useTranslation();
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
    </div>
  );
};

export default UserAbout;
