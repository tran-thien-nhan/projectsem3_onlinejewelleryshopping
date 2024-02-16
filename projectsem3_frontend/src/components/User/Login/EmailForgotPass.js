import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const EmailForgotPass = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire(t("Error"), "Please enter your email", "error");
      return;
    } else if (email.length < 3) {
      Swal.fire(t("Error"), t("Email must be at least 3 characters"), "error");
      return;
    } else if (email.length > 50) {
      Swal.fire(t("Error"), t("Email must be at most 50 characters"), "error");
      return;
    } else if (!email.includes("@")) {
      Swal.fire(t("Error"), t("Invalid email format"), "error");
      return;
    } else if (!email.includes(".")) {
      Swal.fire(t("Error"), t("Invalid email format"), "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://localhost:7241/api/User/checkemail/${email}`
      );
      
      if (response.data === true) {  
        try {
          const sendMailResponse = await axios.get(
            `https://localhost:7241/api/User/sendmailverifyuser/${email}`
          );
          Swal.fire(
            t("Success"),
            t("Email sent. Please check your email to reset your password."),
            "success"
          );
          setEmail(""); 
        } catch (sendMailError) {
          Swal.fire(t("Error"), t("Failed to send email"), "error");
        }
      } else {
        Swal.fire(t("Error"), t("Email not found"), "error");
      }
    } catch (error) {
      // Handle the error here
      Swal.fire(t("Error"), error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t("Forgot Password")}</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">{t("Email")}:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder={t("Enter email to reset password")}
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div>
                  <button type="submit" className="btn btn-primary mt-2">
                    {isLoading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <>{t("Submit")}</>
                    )}
                  </button>
                  <a href="/login" className="btn btn-secondary mt-2 mx-2">
                    {t("Back to Login")}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailForgotPass;
