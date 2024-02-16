import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import HeroSection from "../Layout/HeroSection";
import { useData } from "../../../Context/DataContext";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      Swal.fire(t("Error"), t("Please enter both username and password"), "error");
      setTimeout(() => {
        Swal.close();
      }, 2000);
      return;
    } else if (username.length < 3 || password.length < 3) {
      Swal.fire(
        t("Error"),
        t("Username and password must be at least 3 characters"),
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 2000);
      return;
    } else if (username.length > 20 || password.length > 20) {
      Swal.fire(
        t("Error"),
        t("Username and password must be at most 20 characters"),
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 2000);
      return;
    } else {
      // Login failed
      // Swal.fire("Error", "Wrong username or password", "error");

      setTimeout(() => {
        Swal.close();
        navigate("/login");
      }, 2000);
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://localhost:7241/api/User/checklogin/${username}/${password}`
      );
      const acc = response.data.data;
      console.log(response);
      if (response.status === 200) {
        if (acc.isVerified === false) {
          setLoading(false);
          Swal.fire(t("Error"), t("Please verify your email first"), "error");
          setTimeout(() => {
            Swal.close();
          }, 2000);
          return;
        }

        if (acc.activate === false) {
          setLoading(false);
          Swal.fire(t("Error"), t("Your account is de-activated"), "error");
          setTimeout(() => {
            Swal.close();
          }, 2000);
          return;
        }

        if (acc != null) {
          sessionStorage.setItem("userID", acc.userID);
          sessionStorage.setItem("email", acc.emailID);
          sessionStorage.setItem("password", acc.password);
          sessionStorage.setItem("fname", acc.userFname);
          sessionStorage.setItem("lname", acc.userLname);
          sessionStorage.setItem("address", acc.address);
          sessionStorage.setItem("city", acc.city);
          sessionStorage.setItem("mobNo", acc.mobNo);
          sessionStorage.setItem("state", acc.state);
          sessionStorage.setItem("dob", acc.dob);
          sessionStorage.setItem("userName", acc.userName);
          sessionStorage.setItem("isVerified", acc.isVerified);
          sessionStorage.setItem("activate", acc.activate);

          const role = response.data.role;
          if (role === "admin") {
            setRole(role);
            sessionStorage.setItem("role", role);
            // Login successful
            Swal.fire(t("Success"), t("Login successfully"), "success");
            setTimeout(() => {
              Swal.close();
              navigate("/movingtoadmin");
            }, 2000);
          } else if (role === "user") {
            setRole(role);
            sessionStorage.setItem("role", role);
            // Login successful
            Swal.fire(t("Success"), t("Login successfully"), "success");
            setTimeout(() => {
              Swal.close();
              navigate("/");
            }, 2000);
          } else if (response.status === 404) {
            setLoading(false);
            Swal.fire(t("Error"), t("Login fail"), "error");
            setTimeout(() => {
              Swal.close();
              navigate("/login");
            }, 2000);
          } else {
            setLoading(false);
            setRole("");
            // Login fail
            Swal.fire(t("Error"), t("Login fail"), "error");
            setTimeout(() => {
              Swal.close();
              navigate("/login");
            }, 2000);
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    } catch (error) {
      setLoading(false);
      // Handle other errors
      console.error("Error:", error);
      Swal.fire(t("Error"), t("wrong username or password"), "error");
    }
  };

  return (
    <>
      <HeroSection />
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>{t("LOGIN")}</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3 mt-3">
                <label htmlFor="username">{t("Username")}:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder={t("Enter username")}
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pwd">{t("Password")}:</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder={t("Enter password")}
                  name="pswd"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex">
                <div className="mb-3 col-8">
                  {t("Not a member yet?")}
                  <a href="/register" className="mx-2">
                    {t("Register")}
                  </a>
                </div>
                <div className="mb-3 col-8">
                  {t("Forgot password?")}
                  <a href="/emailforgotpass" className="mx-2">
                    {t("Click Here")}
                  </a>
                </div>
              </div>
              <button
                onClick={handleLogin}
                type="submit"
                className="btn btn-primary"
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>{t("Login")}</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
