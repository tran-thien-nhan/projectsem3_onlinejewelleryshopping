import React from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";

const AdminQlty = () => {
  const { dimQlty, loading, error, handleDelete } = useData();
  return (
    <div className="container-fluid">
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>DimQlty_ID</th>
              <th>DimQlty</th>
              <th>Date</th>
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
              dimQlty.map((dimQlty) => (
                <tr key={dimQlty.dimQlty_ID}>
                  <td>{dimQlty.dimQlty_ID}</td>
                  <td>{dimQlty.dimQlty}</td>
                  <td>{new Date(dimQlty.createdAt).toLocaleString()}</td>
                  <td>
                      <a href={`/admin/dimQlty/${dimQlty.dimQlty_ID}`}>
                            <button className="btn btn-primary">Edit</button>
                          </a>
                          {/* <a href={`/admin/dimQlty/${dimQlty.dimQlty_ID}`}> */}
                          <button onClick={(e) => handleDelete(dimQlty.dimQlty_ID)}>Delete</button>
                      {/* </a> */}
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

export default AdminQlty;
