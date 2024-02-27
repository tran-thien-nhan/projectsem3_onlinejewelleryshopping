import React, { useState } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const AdminDim = () => {
  const { dim, loading, error, dimData } = useData();
  const { dimQlty, dimInfo, dimQltySub } = useData();
  const [createDimLoading, setCreateDimLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleDelete = async (dimMst_ID) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirm.isConfirmed) {
        setDeleteLoading(true); // Set delete loading to true
        const res = await axios.delete(
          `https://localhost:7241/api/DimMst/${dimMst_ID}`
        );
        if (res.data.status === 200) {
          Swal.fire("Success", res.data.message, "success");
          setTimeout(() => {
            Swal.close();
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire("Error", res.data.message, "error");
        }
      } else if (!confirm.isConfirmed) {
        Swal.fire("Cancelled", "Your DimMst is safe :)", "success");
      }
    } catch (error) {
      console.error("Delete dim error:", error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setDeleteLoading(false); // Set delete loading to false regardless of the outcome
    }
  };

  return (
    <div className="container-fluid">
      <h1>DimMst</h1>
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>DimQlty</th>
              <th>DimSub</th>
              <th>DimID</th>
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
                  <td>{dimItem.itemMst.product_Name}</td>
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
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(dimItem.dimMst_ID)}
                    >
                      Delete
                    </button>
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
