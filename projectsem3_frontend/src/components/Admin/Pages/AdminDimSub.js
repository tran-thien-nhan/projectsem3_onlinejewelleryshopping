import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useData } from "../../../Context/DataContext";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminDimSub = () => {
  const { dimQltySub, loading, error } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleVisibilityFilterChange = (filter) => {
    setVisibilityFilter(filter);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setVisibilityFilter("all");
  };

  const handleUpdateVisibility = async (dimSubType_ID) => {
    try {
      await axios.put(
        `https://localhost:7241/api/DimQltySubMst/updatevisibility/${dimSubType_ID}`
      );
      // Update the visibility of the item in the state or fetch the updated data again
      await window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDimQltySub = [...dimQltySub].filter((dimSub) => {
    const matchesSearchTerm =
      dimSub.dimSubType_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dimSub.dimQlty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVisibilityFilter =
      visibilityFilter === "all" ||
      (visibilityFilter === "show" && dimSub.visible) ||
      (visibilityFilter === "hide" && !dimSub.visible);

    return matchesSearchTerm && matchesVisibilityFilter;
  });
  const handleDelete = async (dimSubType_ID) => {
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
          `https://localhost:7241/api/DimQltySubMst/${dimSubType_ID}`
        );
        if (res.data.status === 200) {
          Swal.fire("Success", res.data.message, "success");
          setTimeout(() => {
            Swal.close();
            window.location.reload();
          }, 1500);
        } else if (res.data.status === 409) {
          Swal.fire("Error", res.data.message, "error");
        } else if (res.data.status === 402) {
          Swal.fire("Error", "Cannot Delete This DimQltySub", "error");
        }
      } else if (!confirm.isConfirmed) {
        Swal.fire("Cancelled", "Your DimQltySub is safe :)", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setDeleteLoading(false); // Set delete loading to false regardless of the outcome
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mt-4">Dim Quality Sub</h2>
      <div className="mb-3">
        <label htmlFor="searchTerm">Search by ID or Name</label>
        <input
          type="text"
          className="form-control"
          id="searchTerm"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="visibilityFilter" className="form-label">
          Filter by Visibility
        </label>
        <select
          className="form-select"
          id="visibilityFilter"
          onChange={(e) => handleVisibilityFilterChange(e.target.value)}
          value={visibilityFilter}
        >
          <option value="all">All</option>
          <option value="show">Show</option>
          <option value="hide">Hide</option>
        </select>
      </div>
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>DimQlty</th>
              <th>Visibility</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <TailSpin color="red" radius={8} />
                </td>
              </tr>
            ) : Array.isArray(filteredDimQltySub) &&
              filteredDimQltySub.length > 0 ? (
              filteredDimQltySub.map((dimSub) => (
                <tr key={dimSub.dimSubType_ID}>
                  <td>{dimSub.dimQlty}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleUpdateVisibility(dimSub.dimSubType_ID)
                      }
                    >
                      {dimSub.visible ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                  <td>
                    {/* Nút để chuyển hướng sang trang chỉnh sửa */}
                    <Link
                      to={`/editDimQltySub/${dimSub.dimSubType_ID}`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(dimSub.dimSubType_ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No DimQltySub Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-3">
        {/* Nút để chuyển hướng sang trang tạo mới */}
        <Link to="/createDimQltySub" className="btn btn-primary">
          Create DimQltySub
        </Link>
      </div>
    </div>
  );
};

export default AdminDimSub;
