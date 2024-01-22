import React from "react";
import HeroSection from "../Layout/HeroSection";

const Register = () => {
  return (
    <>
      <HeroSection />
      <div class="container my-4">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h2>REGISTER</h2>
            <form action="/">
              <div class="mb-3 mt-3">
                <label for="fname">First Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="fname"
                  placeholder="Enter first name"
                  name="fname"
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
                />
              </div>
              <div class="mb-3">
                Đã có tài khoản? <a href="/login">Đăng nhập</a>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
