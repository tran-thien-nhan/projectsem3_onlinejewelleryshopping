import React, { useEffect, useState } from "react";
import { useData } from "../../../Context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const AdminEditInfo = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const { adminList, loading, error } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [admin, setAdmin] = useState({
    userName: "",
    password: "",
    adminEmail: "",
  });

  useEffect(() => {
    if (adminList.length > 0) {
      const data = adminList.find((i) => i.userName === userName);
      setAdmin(data);
    }
  }, [adminList, userName]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new URLSearchParams();
    formData.append("userName", admin.userName);
    formData.append("password", admin.password);
    formData.append("adminEmail", admin.adminEmail);

    if (
      adminList.some(
        (i) =>
          i.adminEmail === admin.adminEmail && i.userName !== admin.userName
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "this admin already exists!",
      });
      return;
    }
    try {
      const res = await axios.put(
        `https://localhost:7241/api/Admin/update/${admin.userName}`,
        formData
      );

      console.log(res);
      setIsLoading(false);
      if (res.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Updated successfully",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/adminlist");
          window.location.reload();
        }, 1000);
      } else {
        console.log(res.data.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.data.message,
        });
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="container">
      <h1>Edit Info</h1>
      <div className="row">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ display: "none" }}>
              <label htmlFor="adminUsername">Admin username</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                readOnly
                value={admin && admin.userName}
                placeholder="Enter admin username"
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group" style={{ display: "none" }}>
              <label htmlFor="adminUsername">Admin Password</label>
              <input
                type="password"
                className="form-control"
                id="passord"
                name="password"
                value={admin && admin.password}
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
                value={admin && admin.adminEmail}
                placeholder="Enter admin email"
                onChange={handleChangeInput}
              />
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditInfo;
