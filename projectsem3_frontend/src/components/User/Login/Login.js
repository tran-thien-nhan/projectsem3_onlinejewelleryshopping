import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import HeroSection from "../Layout/HeroSection";
import { useData } from "../../../Context/DataContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      Swal.fire("Error", "Please enter both username and password", "error");
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    } else if (username.length < 3 || password.length < 3) {
      Swal.fire(
        "Error",
        "Username and password must be at least 3 characters",
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    } else if (username.length > 20 || password.length > 20) {
      Swal.fire(
        "Error",
        "Username and password must be at most 20 characters",
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    } else {
      // Login failed
      Swal.fire("Error", "Wrong username or password", "error");

      setTimeout(() => {
        Swal.close();
        navigate("/login");
      }, 1000);
    }

    try {
      const response = await axios.get(
        `https://localhost:7241/api/User/checklogin/${username}/${password}`
      );
      const acc = response.data.data;
      console.log(response);
      if (response.status === 200) {
        if (acc.isVerified === false) {
          Swal.fire("Error", "Please verify your email first", "error");
          setTimeout(() => {
            Swal.close();
          }, 1000);
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

          const role = response.data.role;
          if (role === "admin") {
            setRole(role);
            sessionStorage.setItem("role", role);
            // Login successful
            Swal.fire("Success", "Login successful!", "success");
            setTimeout(() => {
              Swal.close();
              navigate("/movingtoadmin");
            }, 1000);
          } else if (role === "user") {
            setRole(role);
            sessionStorage.setItem("role", role);
            // Login successful
            Swal.fire("Success", "Login successful!", "success");
            setTimeout(() => {
              Swal.close();
              navigate("/");
            }, 1000);
          } else {
            setRole("");
            // Login fail
            Swal.fire("Error", "Login fail!", "error");
            setTimeout(() => {
              Swal.close();
              navigate("/login");
            }, 1000);
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
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
                <label htmlFor="username">username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <div className="d-flex">
                <div className="mb-3 col-8">
                  Not a member yet?
                  <a href="/register" className="mx-2">
                    Register
                  </a>
                </div>
                {/* <div className="mb-3 col-8">
                  Forgot password?
                  <a href="/register" className="mx-2">
                    Click Here
                  </a>
                </div> */}
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
