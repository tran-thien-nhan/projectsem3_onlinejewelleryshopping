import React, { useState } from "react";
import HeroSection from "../Layout/HeroSection";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
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
            "Success",
            "sign up successful! Please Check Your Email",
            "success"
          );
          setTimeout(() => {
            Swal.close();
            navigate("/login");
          }, 2000);
        } else {
          setIsLoading(false);
          console.error("Invalid response or status code:", res.data);
          Swal.fire("Error", res.data.message, "error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        Swal.fire("Error", err.message, "error");
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
              <h2>REGISTER</h2>
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
                  <label for="fname">Username:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Enter username"
                    name="username"
                    value={user.username}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="fname">First Name:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="fname"
                    placeholder="Enter first name"
                    name="fname"
                    value={user.fname}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="lname">Last Name:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lname"
                    placeholder="Enter last name"
                    name="lname"
                    value={user.lname}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="address">Address:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="Enter address"
                    name="address"
                    value={user.address}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="city">City:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="city"
                    placeholder="Enter city"
                    name="city"
                    value={user.city}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="state">State:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="state"
                    placeholder="Enter state"
                    name="state"
                    value={user.state}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="email">Email:</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    value={user.email}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="phone">phone:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    placeholder="Enter phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="dob">DOB:</label>
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
                  <label for="pwd">Password:</label>
                  <input
                    type="password"
                    class="form-control"
                    id="pwd"
                    placeholder="Enter password"
                    name="pswd"
                    value={user.pswd}
                    onChange={handleChangeInput}
                  />
                </div>
                <div class="mb-3">
                  Had Account? <a href="/login">Login</a>
                </div>
                <button type="submit" class="btn btn-primary">
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <>Submit</>
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
