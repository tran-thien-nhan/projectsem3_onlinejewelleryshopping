import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserUpdate = () => {
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    // Lấy thông tin user từ session và cập nhật state
    setUserid(sessionStorage.getItem("userID") || "");
    setUserName(sessionStorage.getItem("userName") || "");
    setEmail(sessionStorage.getItem("email") || "");
    setPassword(sessionStorage.getItem("password") || "");
    setFname(sessionStorage.getItem("fname") || "");
    setLname(sessionStorage.getItem("lname") || "");
    setAddress(sessionStorage.getItem("address") || "");
    setCity(sessionStorage.getItem("city") || "");
    setState(sessionStorage.getItem("state") || "");
    setMobNo(sessionStorage.getItem("mobNo") || "");
    setDob(sessionStorage.getItem("dob") || "");
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const isPasswordChanged = password !== sessionStorage.getItem("password");

    // Tạo object chứa thông tin cập nhật
    const updatedUser = {
      userid: userid,
      userName: userName,
      email: email,
      password: isPasswordChanged ? password : undefined,
      fname: fname,
      lname: lname,
      address: address,
      city: city,
      state: state,
      mobNo: mobNo,
      dob: dob,
    };

    formData.append("userid", userid);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", isPasswordChanged ? password : undefined);
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("mobNo", mobNo);
    formData.append("dob", dob);

    try {
      // Gửi request cập nhật thông tin user qua API bằng Axios
      const response = await axios.put(
        `https://localhost:7241/api/User/updateuser/${userid}`,
        formData
      );

      // Kiểm tra trạng thái của response
      if (response.status === 200) {
        // Cập nhật thành công
        console.log("User updated successfully!");
        // Cập nhật thông tin user trong sessionStorage
        Object.keys(updatedUser).forEach((key) => {
          sessionStorage.setItem(key, updatedUser[key]);
        });
        // Hiện thông báo thành công
        Swal.fire("Success", "User updated successfully!", "success");
        // Chuyển hướng về trang quản lý user
        setTimeout(() => {
          Swal.close();
          navigate("/info");
        }, 1000);
      } else {
        const errorData = response.data;
        if (errorData.statusCode === 400 && errorData.message.includes("already exists")) {
          const field = errorData.message.split(" ")[0]; 
          Swal.fire("Error", `${field} already exists!`, "error");
        } else {
          Swal.fire("Error", "Error updating user!", "error");
        }
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="container my-4">
      <h2>Update User</h2>
      <form id="updateUserForm" onSubmit={handleUpdateUser}>
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <input
            type="userid"
            className="form-control"
            id="userid"
            placeholder="Enter userid"
            name="userid"
            value={userid}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            placeholder="Enter userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
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
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="Enter first name"
            name="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="Enter last name"
            name="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address">Address:</label>
          <textarea
            className="form-control"
            id="address"
            placeholder="Enter address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Enter city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            className="form-control"
            id="state"
            placeholder="Enter state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobNo">Mobile Number:</label>
          <input
            type="text"
            className="form-control"
            id="mobNo"
            placeholder="Enter mobile number"
            name="mobNo"
            value={mobNo}
            onChange={(e) => setMobNo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserUpdate;
