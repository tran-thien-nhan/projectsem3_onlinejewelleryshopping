import React, { useState } from "react";
import HeroSection from "../Layout/HeroSection";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import { useData } from "../../../Context/DataContext";

const Register = () => {
  const navigate = useNavigate();
  const { userList } = useData();
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

    //xử lý nếu có 1 trường nào đó trống
    if (
      user.username === "" ||
      user.fname === "" ||
      user.lname === "" ||
      user.address === "" ||
      user.city === "" ||
      user.state === "" ||
      user.email === "" ||
      user.phone === "" ||
      user.dob === "" ||
      user.pswd === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: t("Please fill in all the information!"),
      });
      return;
    }

    //xử lý nếu username chỉ có 3 ký tự hoặc nhiều hơn 20 ký tự
    if (user.username.length < 6 || user.username.length > 20) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: t("Username must be between 6 and 20 characters!"),
      });
      return;
    }

    //xử lý nếu email sai định dạng
    if (!user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: t("Email is not valid!"),
      });
      return;
    }

    //xử lý nếu nhập không đủ 10 số
    if (user.phone.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: t("Phone number must be 10 digits!"),
      });
      return;
    }

    //xử lý nếu tuổi nhỏ hơn 18
    var today = new Date();
    var birthDate = new Date(user.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: t("You must be at least 18 years old to register!"),
      });
      return;
    } else if (age > 100) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: t("You must be less than 100 years old to register!"),
      });
      return;
    }

    //mật khẩu phải có ít nhất 8 ký tự và có ít nhất 1 chữ cái và 1 chữ số và 1 ký tự đặc biệt
    if (
      !user.pswd.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: t(
          t(
            "Password must be at least 8 characters and must contain at least one letter, one number and one special character!"
          )
        ),
      });
      return;
    }

    setIsLoading(true);
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

    //xử lý nếu trùng sdt với 1 trong các user đã có
    if (
      userList.some(
        (i) => i.mobNo === user.mobNo && i.userID !== userList.userID
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: t("this phone number is already exists!"),
      });
      return;
    }

    //xử lý nếu trùng email với 1 trong các user đã có
    if (
      userList.some(
        (i) => i.emailID === user.emailID && i.userID !== userList.userID
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: t("this email is already exists!"),
      });
      return;
    }

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
                    maxLength={10}
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
