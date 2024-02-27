import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useData } from "../../../Context/DataContext";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminJewelType = () => {
  const { jewelry, loading } = useData();
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

  const handleUpdateVisibility = async (jewellery_ID) => {
    try {
      await axios.put(
        `https://localhost:7241/api/JewelTypeMst/updatevisibility/${jewellery_ID}`
      );
      await window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (jewellery_ID) => {
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
          `https://localhost:7241/api/JewelTypeMst/${jewellery_ID}`
        );

        if (res.data.status === 200) {
          Swal.fire("Success", res.data.message, "success");
          setTimeout(() => {
            Swal.close();
            window.location.reload();
          }, 1500);
        } else if (res.data.status === 404) {
          Swal.fire("Error", res.data.message, "error");
        } else if (res.data.status === 402) {
          Swal.fire("Error", "Cannot Delete This Jewel Type", "error");
        }
      } else if (!confirm.isConfirmed) {
        Swal.fire("Cancelled", "Your Jewel Type is safe :)", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredJewelType = [...jewelry].filter((jewelTypeItem) => {
    const matchesSearchTerm = jewelTypeItem.jewellery_Type
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesVisibilityFilter =
      visibilityFilter === "all" ||
      (visibilityFilter === "show" && jewelTypeItem.visible) ||
      (visibilityFilter === "hide" && !jewelTypeItem.visible);

    return matchesSearchTerm && matchesVisibilityFilter;
  });

  return (
    <div className="container-fluid">
      <h2 className="mt-4">Jewel Type</h2>
      <div className="mb-3">
        <label htmlFor="">Search by Jewel Type</label>
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
              <th>Jewel Type</th>
              <th>Visibility</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">
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
            ) : Array.isArray(filteredJewelType) &&
              filteredJewelType.length > 0 ? (
              filteredJewelType.map((jewelTypeItem) => (
                <tr key={jewelTypeItem.jewellery_ID}>
                  <td>{jewelTypeItem.jewellery_Type}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleUpdateVisibility(jewelTypeItem.jewellery_ID)
                      }
                    >
                      {jewelTypeItem.visible ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/editJewelType/${jewelTypeItem.jewellery_ID}`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(jewelTypeItem.jewellery_ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Jewel Type Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-3 d-flex">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="mb-3">
        <Link to="/createJewelType" className="btn btn-primary">
          Create Jewel Type
        </Link>
      </div>
    </div>
  );
};

export default AdminJewelType;
