import React, { useState } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminList = () => {
  const { adminList, loading, error } = useData();
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Admin username</th>
              <th>Admin email</th>
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
            ) : adminList.length > 0 ? (
              adminList.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.userName}</td>
                  <td>{admin.adminEmail}</td>
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
      <a href="/createadmin" className="btn btn-primary">
        New Admin
      </a>
    </div>
  );
};

export default AdminList;
