import React, { useEffect, useState } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const AdminUserList = () => {
  const { userList, loading, error, orderList } = useData();
  const [statusFilter, setStatusFilter] = useState("all");
  const [activateFilter, setActivateFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [userBuyingCounts, setUserBuyingCounts] = useState({});
  const [userOrderCancelCounts, setUserOrderCancelCounts] = useState({});
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchBuyingCounts = async () => {
      try {
        const counts = {};
        for (const user of userList) {
          const response = await axios.get(
            `https://localhost:7241/api/User/countorderofuser/${user.userID}`
          );
          counts[user.userID] = response.data;
        }
        setUserBuyingCounts(counts);
      } catch (error) {
        console.log("Error fetching buying counts:", error);
      }
    };

    const fetchOrderCancelCounts = async () => {
      try {
        const counts = {};
        for (const user of userList) {
          const response = await axios.get(
            `https://localhost:7241/api/User/countcancelorderofuser/${user.userID}`
          );
          counts[user.userID] = response.data;
        }
        setUserOrderCancelCounts(counts);
      } catch (error) {
        console.log("Error fetching order cancel counts:", error);
      }
    };

    fetchBuyingCounts();
    fetchOrderCancelCounts();
  }, [userList]);

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const handleActivateFilterChange = (filter) => {
    setActivateFilter(filter);
  };

  const handleActivate = async (userID) => {
    try {
      await axios.put(`https://localhost:7241/api/User/activeuser/${userID}`);
      await window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortByBuyingCount = () => {
    if (sortBy === "asc") {
      setSortBy("desc");
    } else {
      setSortBy("asc");
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
    setSortBy("");
  };

  const sortedUserList = [...filteredUserList].sort((a, b) => {
    const countA = userBuyingCounts[a.userID] || 0;
    const countB = userBuyingCounts[b.userID] || 0;
    if (sortBy === "asc") {
      return countA - countB;
    } else {
      return countB - countA;
    }
  });

  return (
    <div className="container-fluid">
      <h2>User List</h2>
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
              <th>Verified</th>
              <th>Activate</th>
              <th>
                Buying Count{" "}
                <button
                  className="btn btn-primary"
                  onClick={handleSortByBuyingCount}
                >
                  {sortBy === "asc" ? "▲" : "▼"}
                </button>
              </th>
              <th>Order Cancel Count</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <TailSpin color="red" radius={8} />
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="9">Error: {error.message}</td>
              </tr>
            ) : (
              sortedUserList.map((user) => (
                <tr key={user.userID}>
                  <td>{user.userID}</td>
                  <td>{user.userName}</td>
                  <td>{user.mobNo}</td>
                  <td>{user.isVerified ? "Verified" : "Not Verified"}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleActivate(user.userID)}
                    >
                      {user.activate ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                  <td>
                    {userBuyingCounts[user.userID] === undefined
                      ? "Loading..."
                      : userBuyingCounts[user.userID]}
                  </td>
                  <td>
                    {userOrderCancelCounts[user.userID] === undefined
                      ? "Loading..."
                      : userOrderCancelCounts[user.userID]}
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
