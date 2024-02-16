import React, { useState } from "react";
import HeroSection from "../Layout/HeroSection";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); 
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    userID: "",
    username: "",
    fname: "",
    lname: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    dob: "",
    pswd: "",
  });
  function handleChangeInput(e) {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userID", 1);
    formData.append("username", user.username);
    formData.append("userFname", user.fname);
    formData.append("userLname", user.lname);
    formData.append("address", user.address);
    formData.append("city", user.city);
    formData.append("state", user.state);
    formData.append("emailID", user.email);
    formData.append("mobNo", user.phone);
    formData.append("dob", user.dob);
    formData.append("password", user.pswd);

    axios
      .post("https://localhost:7241/api/User/register", formData)
      .then((res) => {
        if (res.data && res.data.status === 200) {
          setIsLoading(true);
          Swal.fire(
            t("Success"),
            t("sign up successful! Please Check Your Email"),
            "success"
          );
          setTimeout(() => {
            Swal.close();
            navigate("/login");
          }, 2000);
        } else {
          setIsLoading(false);
          console.error("Invalid response or status code:", res.data);
          Swal.fire("Error", t(res.data.message), "error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        Swal.fire("Error", t(err.message), "error");
      });
  }

  return (
    <>
      <HeroSection />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TailSpin color="red" radius={8} />
        </div>
      ) : (
        <div class="container my-4">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <h2>{t("REGISTER")}</h2>
              <form onSubmit={handleSubmit}>
                <div class="mb-3 mt-3" style={{ display: "none" }}>
                  <input
                    type="text"
                    class="form-control"
                    id="userID"
                    name="userID"
                    value={1}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="fname">{t("Username")}:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder={t("Enter username")}
                    name="username"
                    value={user.username}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="fname">{t("First Name")}:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="fname"
                    placeholder={t("Enter first name")}
                    name="fname"
                    value={user.fname}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="lname">{t("Last Name")}:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lname"
                    placeholder={t("Enter last name")}
                    name="lname"
                    value={user.lname}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="address">{t("Address")}:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder={t("Enter address")}
                    name="address"
                    value={user.address}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="city">{t("City")}:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="city"
                    placeholder={t("Enter city")}
                    name="city"
                    value={user.city}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="state">{t("State")}:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="state"
                    placeholder={t("Enter state")}
                    name="state"
                    value={user.state}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="email">{t("Email")}:</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder={t("Enter email")}
                    name="email"
                    value={user.email}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="phone">{t("phone")}:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    placeholder={t("Enter phone")}
                    name="phone"
                    value={user.phone}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="dob">{t("DOB")}:</label>
                  <input
                    type="date"
                    class="form-control"
                    id="dob"
                    placeholder="Enter dob"
                    name="dob"
                    value={user.dob}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3">
                  <label for="pwd">{t("Password")}:</label>
                  <input
                    type="password"
                    class="form-control"
                    id="pwd"
                    placeholder={t("Enter password")}
                    name="pswd"
                    value={user.pswd}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3">
                  {t("Had Account?")} <a href="/login">{t("Login")}</a>
                </div>
                <button type="submit" class="btn btn-primary">
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <>{t("Sign Up")}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
