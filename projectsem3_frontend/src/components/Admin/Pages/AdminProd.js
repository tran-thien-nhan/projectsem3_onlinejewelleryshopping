import React from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";

const AdminProd = () => {
  const { prod, loading, error } = useData();
  return (
    <div className="container-fluid">
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>prod_ID</th>
              <th>prod_Type</th>
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
                prod.map((prod) => (
                <tr key={prod.prod_ID}>
                  <td>{prod.prod_ID}</td>
                  <td>{prod.prod_Type}</td>
                  <td>{new Date(prod.createdAt).toLocaleString()}</td>
                  <td>
                      <a href={`/admin/prod/${prod.prod_ID}`}>
                            <button className="btn btn-primary">Edit</button>
                          </a>
                          <a href={`/admin/prod/${prod.prod_ID}`}>
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

export default AdminProd;
