import React, { useState, useEffect } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminProd = () => {
  const { prod, loading, error } = useData();
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

  const handleUpdateVisibility = async (prod_ID) => {
    try {
      await axios.put(
        `https://localhost:7241/api/ProdMst/updatevisibility/${prod_ID}`
      );
      await window.location.reload();
    } catch (error) {
      console.error("Update prod visibility error:", error);
    }
  };

  const handleDelete = async (prod_ID) => {
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
          `https://localhost:7241/api/ProdMst/${prod_ID}`
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
          Swal.fire("Error", "Cannot Delete This Prod", "error");
        }
      } else if (!confirm.isConfirmed) {
        // Show cancellation message
        Swal.fire("Cancelled", "Your Prod is safe :)", "success");
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
  const currentItems = prod.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search term or visibility filter changes
  }, [searchTerm, visibilityFilter]);

  const filteredProd = currentItems.filter((prodItem) => {
    const matchesSearchTerm = prodItem.prod_Type
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesVisibilityFilter =
      visibilityFilter === "all" ||
      (visibilityFilter === "show" && prodItem.visible) ||
      (visibilityFilter === "hide" && !prodItem.visible);

    return matchesSearchTerm && matchesVisibilityFilter;
  });

  return (
    <div className="container-fluid">
      <h1 className="mt-4">Product Type</h1>
      <div className="mb-3">
        <label htmlFor="searchTerm">Search by Product Type</label>
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
              <th>Product Type</th>
              <th>Visibility</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <TailSpin color="red" radius={8} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3">Error: {error.message}</td>
              </tr>
            ) : (
              filteredProd.map((prodItem) => (
                <tr key={prodItem.prod_ID}>
                  <td>{prodItem.prod_Type}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateVisibility(prodItem.prod_ID)}
                    >
                      {prodItem.visible ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/editProd/${prodItem.prod_ID}`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(prodItem.prod_ID)}
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
        <Link to="/createProd" className="btn btn-primary">
          Create Product
        </Link>
      </div>
      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(prod.length / itemsPerPage) }).map(
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

export default AdminProd;
