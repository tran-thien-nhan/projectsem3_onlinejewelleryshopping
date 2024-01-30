import React from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";

const AdminDimSub = () => {
  const { dimQltySub, loading, error } = useData();
  return (
    <div className="container-fluid">
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>DimSubType_ID</th>
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
              dimQltySub.map((dimQltySub) => (
                <tr key={dimQltySub.dimSubType_ID}>
                  <td>{dimQltySub.dimSubType_ID}</td>
                  <td>{dimQltySub.dimQlty}</td>
                  <td>{new Date(dimQltySub.createdAt).toLocaleString()}</td>
                  <td>
                      <a href={`/admin/dimQltySub/${dimQltySub.dimSubType_ID}`}>
                            <button className="btn btn-primary">Edit</button>
                          </a>
                          <a href={`/admin/dimQltySub/${dimQltySub.dimSubType_ID}`}>
                            <button className="btn btn-primary">Delete</button>
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

export default AdminDimSub;
