import React from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";

const AdminDim = () => {
  const { dim, loading, error } = useData();
  return (
    <div className="container-fluid">
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              {/* <th>Style_Code</th> */}
              <th>Dim_Crt</th>
              <th>Dim_Pcs No</th>
              <th>Dim_Gm</th>
              <th>Dim_Size</th>
              <th>Dim_Rate</th>
              <th>Dim_Amt</th>
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
                dim.map((dim) => (
                <tr key={dim.style_Code}>
                  {/* <td>{dim.style_Code}</td> */}
                  <td>{dim.dim_Crt}</td>
                  <td>{dim.dim_Pcs}</td>
                  <td>{dim.dim_Gm}</td>
                  <td>{dim.dim_Size}</td>
                  <td>{dim.dim_Rate}</td>
                  <td>{dim.dim_Amt}</td>
                  <td>{new Date(dim.createdAt).toLocaleString()}</td>
                  <td>
                      <a href={`/admin/dim/${dim.style_Code}`}>
                            <button className="btn btn-primary">Edit</button>
                          </a>
                          <a href={`/admin/dim/${dim.style_Code}`}>
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

export default AdminDim;
