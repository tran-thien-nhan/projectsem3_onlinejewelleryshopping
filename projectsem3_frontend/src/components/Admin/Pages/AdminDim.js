import React, { useState } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";

const AdminDim = () => {
  const { dim, loading, error, dimData } = useData();
  const { dimQlty, dimInfo, dimQltySub } = useData();
  const [createDimLoading, setCreateDimLoading] = useState(false);
  const handleUpdateVisibility = async (dimMst_ID) => {
    try {
      await axios.put(
        `https://localhost:7241/api/DimMst/updatevisibility/${dimMst_ID}`
      );
      // Update the visibility of the item in the state or fetch the updated data again
      await window.location.reload();
    } catch (error) {
      console.error("Update dim visibility error:", error);
    }
  };

  return (
    <div className="container-fluid">
      <h1>DimMst</h1>
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>DimQlty</th>
              <th>DimSub</th>
              <th>DimID</th>
              {/* <th>Dim_Crt</th>
              <th>Dim_Pcs No</th>
              <th>Dim_Gm</th>
              <th>Dim_Size</th>
              <th>Dim_Rate</th>
              <th>Dim_Amt</th> */}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  <TailSpin color="red" radius={8} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="8">Error: {error.message}</td>
              </tr>
            ) : (
              dim.map((dimItem) => (
                <tr key={dimItem.dimMst_ID}>
                  <td>
                    {dimQlty.map((dimQuality) =>
                      dimQuality.dimQlty_ID === dimItem.dimQlty_ID
                        ? dimQuality.dimQlty
                        : null
                    )}
                  </td>
                  <td>
                    {dimInfo.map((dimInfoQuality) =>
                      dimInfoQuality.dimID === dimItem.dimID
                        ? dimInfoQuality.dimType
                        : null
                    )}
                  </td>
                  <td>
                    {dimQltySub.map((dimSub) =>
                      dimSub.dimSubType_ID === dimItem.dimSubType_ID
                        ? dimSub.dimQlty
                        : null
                    )}
                  </td>
                  {/* <td>{dimItem.dim_Crt}</td>
                  <td>{dimItem.dim_Pcs}</td>
                  <td>{dimItem.dim_Gm}</td>
                  <td>{dimItem.dim_Size}</td>
                  <td>{dimItem.dim_Rate}</td>
                  <td>{dimItem.dim_Amt}</td> */}
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateVisibility(dimItem.dimMst_ID)}
                    >
                      {dimItem.visible ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                  <td>
                    <a
                      href={`/edit-dim/${dimItem.dimMst_ID}`}
                      className="btn btn-danger"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
      </div>
      <div>
          <a
            href="/create-dim"
            style={{ textDecoration: "none" }}
            className="btn btn-success"
            onClick={() => setCreateDimLoading(true)}
          >
            Create New
          </a>
        </div>
    </div>
  );
};

export default AdminDim;
