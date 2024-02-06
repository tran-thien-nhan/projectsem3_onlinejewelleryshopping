import React, { useState } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const AdminUserList = () => {
  const { userList, loading, error } = useData();
  const [statusFilter, setStatusFilter] = useState("all");
  const [activateFilter, setActivateFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho ô tìm kiếm

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const handleActivateFilterChange = (filter) => {
    setActivateFilter(filter);
  };

  const handleActivate = async (userID) => {
    try {
      await axios.put(`https://localhost:7241/api/User/activeuser/${userID}`);
      // Update the visibility of the item in the state or fetch the updated data again
      await window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUserList = userList
    .filter((user) => {
      if (statusFilter === "all") {
        return true;
      } else if (statusFilter === "verified") {
        return user.isVerified === true;
      } else {
        return user.isVerified === false;
      }
    })
    .filter((user) => {
      if (activateFilter === "all") {
        return true;
      } else if (activateFilter === "active") {
        return user.activate === true;
      } else {
        return user.activate === false;
      }
    })
    .filter((user) => {
      // Áp dụng bộ lọc từ ô tìm kiếm
      const searchTermLower = searchTerm.toLowerCase();
      return (
        user.userID.includes(searchTermLower) ||
        user.userName.toLowerCase().includes(searchTermLower) ||
        user.city.toLowerCase().includes(searchTermLower) ||
        user.mobNo.includes(searchTermLower) ||
        user.address.toLowerCase().includes(searchTermLower)
      );
    });

  const handleReset = () => {
    setStatusFilter("all");
    setSearchTerm("");
    setActivateFilter("all");
  };

  return (
    <div className="container-fluid">
      <div className="mb-3">
        <label htmlFor="statusFilter" className="form-label">
          Filter by Verified Status
        </label>
        <select
          className="form-select"
          id="statusFilter"
          onChange={(e) => handleStatusFilterChange(e.target.value)}
          value={statusFilter}
        >
          <option value="all">All</option>
          <option value="verified">verified</option>
          <option value="not verified">not verified</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="activateFilter" className="form-label">
          Filter by Activated Status
        </label>
        <select
          className="form-select"
          id="activateFilter"
          onChange={(e) => handleActivateFilterChange(e.target.value)}
          value={activateFilter}
        >
          <option value="all">All</option>
          <option value="active">activate</option>
          <option value="deactive">deactivate</option>
        </select>
      </div>

      {/* Thêm ô tìm kiếm */}
      <div className="mb-3">
        <label htmlFor="searchTerm" className="form-label">
          Search by UserID, Username, City, Mob No, or Address
        </label>
        <input
          type="text"
          className="form-control"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Mob No</th>
              <th>City</th>
              <th>Joined Date</th>
              <th>Verified</th>
              <th>Activate</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
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
            ) : error ? (
              <tr>
                <td colSpan="9">Error: {error.message}</td>
              </tr>
            ) : (
              filteredUserList.map((user) => (
                <tr key={user.userID}>
                  <td>{user.userID}</td>
                  <td>{user.userName}</td>
                  <td>{user.mobNo}</td>
                  <td>{user.city}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{user.isVerified ? "Verified" : "Not Verified"}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleActivate(user.userID)}
                    >
                      {user.activate ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                  <td>
                    <a
                      href={`/user/${user.userID}`}
                      className="btn btn-primary"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-3 d-flex">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default AdminUserList;
