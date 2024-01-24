import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import HeroSection from "../Layout/HeroSection";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      Swal.fire("Error", "Please enter both email and password", "error");
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    } else if (email.length < 2 || password.length < 2) {
      Swal.fire(
        "Error",
        "Email or password must be at least 6 characters",
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    } else if (email.length > 50 || password.length > 50) {
      Swal.fire(
        "Error",
        "Email or password must be less than 50 characters",
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    } else if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
      Swal.fire("Error", "Email is invalid", "error");
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    }
    else{
      // Login failed
      Swal.fire("Error", "Wrong username or password", "error");

      setTimeout(() => {
        Swal.close();
        navigate("/login");
      }, 1000);
    }

    try {
      const response = await axios.get(
        `https://localhost:7241/api/User/checklogin/${email}/${password}`
      );
      const acc = response.data.data;
      if (response.status === 200) {
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
          // Login successful
          Swal.fire("Success", "Login successful!", "success");

          setTimeout(() => {
            Swal.close();
            navigate("/");
          }, 1000);

          // Wait for 1 second before reloading the page
          await new Promise((resolve) => setTimeout(resolve, 2000));
          //window.location.reload();
        }
      } 
    } catch (error) {
      // Handle other errors
      console.error("Error:", error);
      Swal.fire("Error", "An error occurred. Please try again later.", "error");
    }
  };

  return (
    <>
      <HeroSection />
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>LOGIN</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3 mt-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pwd">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Enter password"
                  name="pswd"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                chưa có tài khoản?
                <a href="/register" className="mx-2">
                  Đăng Ký
                </a>
              </div>
              <button
                onClick={handleLogin}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
