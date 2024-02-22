import React, { useState } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminList = () => {
  const { adminList, loading, error } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [onlineStatusFilter, setOnlineStatusFilter] = useState("all");

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const timeDifference = now.getTime() - time.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} days ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} months ago`;
    }

    const years = Math.floor(months / 12);
    return `${years} years ago`;
  };

  const handleFilterOnlineStatusChange = (filter) => {
    setOnlineStatusFilter(filter);
  };

  const filteredAdminList = adminList.filter((admin) => {
    if (onlineStatusFilter === "all") {
      return true;
    } else if (onlineStatusFilter === "online") {
      return admin.onlineStatus === true;
    } else {
      return admin.onlineStatus === false;
    }
  });

  const handleReset = () => {
    setOnlineStatusFilter("all");
  };

  const handleDelete = async (userName) => {
    try {
      axios
        .delete(`https://localhost:7241/api/Admin/delete/${userName}`)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <h2>Admin List</h2>

      <div className="mb-3">
        <label htmlFor="activateFilter" className="form-label">
          Filter by Online Status
        </label>
        <select
          className="form-select"
          id="onelineStatusFilter"
          onChange={(e) => handleFilterOnlineStatusChange(e.target.value)}
          value={onlineStatusFilter}
        >
          <option value="all">All</option>
          <option value="online">online</option>
          <option value="offline">offline</option>
        </select>
      </div>

      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Admin username</th>
              <th>Admin email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                    }}
                  >
                    <TailSpin color="red" radius={8} />{" "}
                  </div>
                </td>
              </tr>
            ) : filteredAdminList.length > 0 ? (
              filteredAdminList.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.userName}</td>
                  <td>{admin.adminEmail}</td>
                  <td>
                    <span
                      className={`badge ${
                        admin.onlineStatus ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {admin.onlineStatus ? "Online" : "Offline"}
                    </span>
                    <p>{getTimeAgo(admin.lastAccessTime)}</p>
                  </td>
                  <td>
                    <a
                      className="btn btn-primary"
                      href={`/editadmin/${admin.userName}`}
                    >
                      Update
                    </a>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(admin.userName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-3 d-flex">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
        <a href="/createadmin" className="btn btn-primary mx-2">
          New Admin
        </a>
      </div>
    </div>
  );
};

export default AdminList;
