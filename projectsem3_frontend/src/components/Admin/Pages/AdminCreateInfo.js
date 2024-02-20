import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const AdminCreateInfo = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    userName: "",
    password: "",
    adminEmail: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, password, adminEmail } = admin;

    const regex = /^admin\d+$/;
    if (!regex.test(userName)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Username must start with 'admin' and followed by a number!",
      });
      return;
    }

    if (!userName || !password || !adminEmail) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required!",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://localhost:7241/api/Admin",
        admin
      );
      if (response.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Admin created successfully",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/adminlist");
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Create Admin Info</h1>
      <div className="row">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="adminUsername">Admin username</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={admin.userName}
                placeholder="Enter admin username"
                onChange={handleChangeInput}
              />
            </div>

            <div className="form-group">
              <label htmlFor="adminPassword">Admin Password</label>
              <input
                type="password"
                className="form-control"
                id="passord"
                name="password"
                placeholder="Enter admin password"
                value={admin.password}
                onChange={handleChangeInput}
              />
            </div>

            <div className="form-group">
              <label htmlFor="adminEmail">Admin email</label>
              <input
                type="email"
                className="form-control"
                id="adminEmail"
                name="adminEmail"
                value={admin.adminEmail}
                placeholder="Enter admin email"
                onChange={handleChangeInput}
              />
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateInfo;
