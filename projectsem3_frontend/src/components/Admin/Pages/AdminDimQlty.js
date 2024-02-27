import React, { useState, useEffect } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminQlty = () => {
  const { dimQlty, loading, error } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleVisibilityFilterChange = (filter) => {
    setVisibilityFilter(filter);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateVisibility = async (dimQlty_ID) => {
    try {
      await axios.put(
        `https://localhost:7241/api/DimQltyMst/updatevisibility/${dimQlty_ID}`
      );
      await window.location.reload();
    } catch (error) {
      console.error("Update dimQlty visibility error:", error);
    }
  };

  const handleDelete = async (dimQlty_ID) => {
    try {
      // Confirm delete
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
        // Delete item
        const res = await axios.delete(
          `https://localhost:7241/api/DimQltyMst/${dimQlty_ID}`
        );
        console.log(res.data);
        if (res.data.status === 200) {
          // Show success message
          Swal.fire("Success", res.data.message, "success");
          setTimeout(() => {
            // Close the SweetAlert2 message and reload the page
            Swal.close();
            window.location.reload();
          }, 1500);
        } else if (res.data.status === 409) {
          // Show error message
          Swal.fire("Error", res.data.message, "error");
        } else if (res.data.status === 402) {
          // Show error message
          Swal.fire("Error", "Cannot Delete This DimQlty", "error");
        }
      } else if (!confirm.isConfirmed) {
        // Show cancellation message
        Swal.fire("Cancelled", "Your DimQlty is safe :)", "success");
      }
    } catch (error) {
      console.error(error);
      // Show error message
      Swal.fire("Error", error.message, "error");
    }
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dimQlty.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search term or visibility filter changes
  }, [searchTerm, visibilityFilter]);

  const filteredDimQlty = currentItems.filter((dimQltyItem) => {
    const matchesSearchTerm = dimQltyItem.dimQlty
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesVisibilityFilter =
      visibilityFilter === "all" ||
      (visibilityFilter === "show" && dimQltyItem.visible) ||
      (visibilityFilter === "hide" && !dimQltyItem.visible);

    return matchesSearchTerm && matchesVisibilityFilter;
  });

  return (
    <div className="container-fluid">
      <h1 className="mt-4">Dim Quality</h1>
      <div className="mb-3">
        <label htmlFor="searchTerm">Search by DimQlty</label>
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
              <th>Date</th>
              <th>Status</th>
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
            ) : error ? (
              <tr>
                <td colSpan="4">Error: {error.message}</td>
              </tr>
            ) : (
              filteredDimQlty.map((dimQltyItem) => (
                <tr key={dimQltyItem.dimQlty_ID}>
                  <td>{dimQltyItem.dimQlty}</td>
                  <td>{new Date(dimQltyItem.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleUpdateVisibility(dimQltyItem.dimQlty_ID)
                      }
                    >
                      {dimQltyItem.visible ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/editDimQlty/${dimQltyItem.dimQlty_ID}`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(dimQltyItem.dimQlty_ID)}
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
        <Link to="/createDimQlty" className="btn btn-primary">
          Create DimQlty
        </Link>
      </div>
      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(dimQlty.length / itemsPerPage) }).map(
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default AdminQlty;
