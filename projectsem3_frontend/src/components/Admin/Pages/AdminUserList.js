import React from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";

const AdminUserList = () => {
  const { userList, loading, error } = useData();
  return (
    <div className="container-fluid">
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Mob No</th>
              <th>City</th>
              <th>Joined Date</th>
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
              userList.map((user) => (
                <tr key={user.userID}>
                  <td>{user.userID}</td>
                  <td>{user.userName}</td>
                  <td>{user.mobNo}</td>
                  <td>{user.city}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
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
    </div>
  );
};

export default AdminUserList;
