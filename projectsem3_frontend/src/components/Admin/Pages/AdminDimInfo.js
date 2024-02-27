import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useData } from "../../../Context/DataContext";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdminDimInfo = () => {
  const { dimInfo, loading, error } = useData();
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

  const handleUpdateVisibility = async (dimID) => {
    try {
      await axios.put(
        `https://localhost:7241/api/DimInfoMst/updatevisibility/${dimID}`
      );
      await window.location.reload();
    } catch (error) {
      console.error("Update DimInfo visibility error:", error);
    }
  };

  const handleDelete = async (dimID) => {
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
        setDeleteLoading(true);
        const res = await axios.delete(
          `https://localhost:7241/api/DimInfoMst/${dimID}`
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
          Swal.fire("Error", "Cannot Delete This DimInfo", "error");
        }
      } else if (!confirm.isConfirmed) {
        Swal.fire("Cancelled", "Your DimInfo is safe :)", "success");
      }
    } catch (error) {
      console.error("Delete DimInfo error:", error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredDimInfo = dimInfo.filter((dimInfoItem) => {
    const matchesSearchTerm =
      dimInfoItem.dimType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dimInfoItem.dimSubType &&
        dimInfoItem.dimSubType
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesVisibilityFilter =
      visibilityFilter === "all" ||
      (visibilityFilter === "show" && dimInfoItem.visible) ||
      (visibilityFilter === "hide" && !dimInfoItem.visible);

    return matchesSearchTerm && matchesVisibilityFilter;
  });

  return (
    <div className="container-fluid">
      <h2 className="mt-4">Dim Info</h2>
      <div className="mb-3">
        <label htmlFor="searchTerm">Search by DimType or DimSubType</label>
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
              <th>DimType</th>
              <th>DimSubType</th>
              <th>DimCarat</th>
              <th>DimPrice</th>
              <th>DimImage</th>
              <th>DimYear</th>
              <th>Date Created</th>
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
              filteredDimInfo.map((dimInfoItem) => (
                <tr key={dimInfoItem.dimID}>
                  <td>{dimInfoItem.dimType}</td>
                  <td>{dimInfoItem.dimSubType || "-"}</td>
                  <td>{dimInfoItem.dimCrt}</td>
                  <td>{dimInfoItem.dimPrice}</td>
                  <td>
                    <img
                      src={
                        dimInfoItem.dimImg ||
                        "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
                      }
                      alt="Dim Image"
                      style={{ maxWidth: "100px" }}
                    />
                  </td>
                  <td>{dimInfoItem.dimYear}</td>
                  <td>{new Date(dimInfoItem.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateVisibility(dimInfoItem.dimID)}
                    >
                      {dimInfoItem.visible ? <FaCheck /> : <FaTimes />}
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/editDimInfo/${dimInfoItem.dimID}`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(dimInfoItem.dimID)}
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
      <div className="mb-3">
        <Link to="/createDimInfo" className="btn btn-primary">
          Create DimInfo
        </Link>
      </div>
    </div>
  );
};

export default AdminDimInfo;
