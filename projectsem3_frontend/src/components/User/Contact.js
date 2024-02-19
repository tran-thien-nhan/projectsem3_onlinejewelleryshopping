import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const [formData, setFormData] = useState({
    userID: "",
    name: "",
    city: "",
    contact: "",
    emailID: "",
    comment: "",
    visible: true,
  });
  const { t, i18n } = useTranslation();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("userID")) {
      window.location.href = "/login";
    }

    const userLoggedIn = sessionStorage.getItem("userID");
    if (userLoggedIn) {
      axios
        .get(`https://localhost:7241/api/User/getuserbyid/${userLoggedIn}`)
        .then((response) => {
          const userData = response.data.data;
          setFormData({
            userID: sessionStorage.getItem("userID") || "",
            name: `${userData.userFname} ${userData.userLname}` || "",
            city: userData.city || "",
            contact: userData.mobNo || "",
            emailID: userData.emailID || "",
            comment: "",
          });
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userID") {
      value = sessionStorage.getItem("userID");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //nếu không nhập comment
      if (formData.comment === null || formData.comment === "") {
        setErrorMessage("Please enter your comment");
        return;
      }
      // Gửi yêu cầu HTTP để tạo comment mới
      const response = await axios.post(
        "https://localhost:7241/api/Inquiry/create",
        formData
      );
      setSuccessMessage("Comment submitted successfully!");
      // Xóa dữ liệu trong formData để chuẩn bị cho comment tiếp theo
      setFormData({
        userID: "",
        name: "",
        city: "",
        contact: "",
        emailID: "",
        comment: "",
      });
      return;
    } catch (error) {
      console.error("Error submitting comment:", error);
      setErrorMessage("Failed to submit comment.");
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-4 text-center">{t("Contact Us")}</h2>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {t(successMessage)}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {t(errorMessage)}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
        />
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            {t("Name")}
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            {t("City")}
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            {t("phone number")}
          </label>
          <input
            type="text"
            className="form-control"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailID" className="form-label">
            {t("Email")}
          </label>
          <input
            type="email"
            className="form-control"
            id="emailID"
            name="emailID"
            value={formData.emailID}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            {t("Comment")}
          </label>
          <textarea
            className="form-control"
            id="comment"
            name="comment"
            rows="4"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-lg">
            {t("Submit")}
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Contact;
