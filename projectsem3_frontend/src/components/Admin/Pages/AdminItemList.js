import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useData } from "../../../Context/DataContext";
import { saveAs } from "file-saver";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminItemList = () => {
  const { items, loading, error } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mrpSortOrder, setMrpSortOrder] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [quantityFilter, setQuantityFilter] = useState("all");
  const [createItemLoading, setCreateItemLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlecheckQuantity = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7241/api/ItemMst/checkquantity`
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVisibilityFilterChange = (filter) => {
    setVisibilityFilter(filter);
  };

  const handleQuantityFilterChange = (filter) => {
    setQuantityFilter(filter);
  };

  const handleGenerateReportItems = async () => {
    try {
      setIsLoading(true);
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const response = await axios.get(
        `https://localhost:7241/api/ItemMst/getallitemsexcel`,
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/xlsx" });
      saveAs(blob, `Items_Report_${formattedDate}.xlsx`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.quantity - b.quantity;
    } else if (sortOrder === "desc") {
      return b.quantity - a.quantity;
    }

    // Sắp xếp theo trường `mrp`
    if (mrpSortOrder === "asc") {
      return a.mrp - b.mrp;
    } else {
      return b.mrp - a.mrp;
    }
  });

  const handleSortOrderChange = (field) => {
    if (field === "quantity") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setMrpSortOrder("");
    } else if (field === "mrp") {
      setMrpSortOrder(mrpSortOrder === "asc" ? "desc" : "asc");
      setSortOrder("");
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = sortedItems.filter((item) => {
    const matchesSearchTerm =
      item.style_Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product_Name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVisibilityFilter =
      visibilityFilter === "all" ||
      (visibilityFilter === "show" && item.visible) ||
      (visibilityFilter === "hide" && !item.visible);

    const matchesQuantityFilter =
      quantityFilter === "all" ||
      (quantityFilter === "lte10" && item.quantity <= 10) ||
      (quantityFilter === "gt10" && item.quantity > 10);

    return (
      matchesSearchTerm && matchesVisibilityFilter && matchesQuantityFilter
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems
    .slice(indexOfFirstItem, indexOfLastItem)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReset = () => {
    setSearchTerm("");
    setSortOrder("");
    setMrpSortOrder("");
    setVisibilityFilter("all");
    setQuantityFilter("all");
  };

  const handleUpdateVisibility = async (styleCode) => {
    try {
      await axios.put(
        `https://localhost:7241/api/ItemMst/updatevisibility/${styleCode}`
      );
      // Update the visibility of the item in the state or fetch the updated data again
      await window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (styleCode) => {
    try {
      //confirm button
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
        const res = await axios.delete(
          `https://localhost:7241/api/ItemMst/${styleCode}`
        );
        console.log(res.data);
        if (res.data.status === 201) {
          window.location.reload();
        } else if (res.data.status === 409) {
          Swal.fire("Error", res.data.message, "error");
        } else if (res.data.status === 402) {
          Swal.fire("Error", "Cannot Delete This Item", "error");
        }
      } else if (!confirm.isConfirmed) {
        Swal.fire("Cancelled", "Your Item is safe :)", "success");
      }
      // await window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mt-4">Items List</h2>
      <div className="mb-3">
        <label htmlFor="searchTerm" className="form-label">
          Search by ID or Name
        </label>
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
      <div className="mb-3">
        <label htmlFor="quantityFilter" className="form-label">
          Filter by Quantity
        </label>
        <select
          className="form-select"
          id="quantityFilter"
          onChange={(e) => handleQuantityFilterChange(e.target.value)}
          value={quantityFilter}
        >
          <option value="all">All</option>
          <option value="lte10">Out Of Stock</option>
          <option value="gt10">Available</option>
        </select>
      </div>

      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>
                <a
                  className=""
                  style={{ cursor: "pointer", textDecoration: "none" }}
                  onClick={() => handleSortOrderChange("mrp")}
                >
                  {mrpSortOrder === "asc" ? "MRP ▲" : "MRP ▼"}
                </a>
              </th>
              <th>
                <a
                  className=""
                  style={{ cursor: "pointer", textDecoration: "none" }}
                  onClick={() => handleSortOrderChange("quantity")}
                >
                  {sortOrder === "asc" ? "Quantity ▲" : "Quantity ▼"}
                </a>
              </th>
              <th>Visible</th>
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
                <TailSpin color="red" radius={8} />{" "}
              </div>
            ) : Array.isArray(sortedItems) && sortedItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.style_Code}>
                  <td>
                    <img
                      src={
                        item.imagePath ||
                        "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
                      }
                      alt={item.product_Name}
                      width="50px"
                      height="50px"
                    />
                  </td>
                  <td>{item.product_Name}</td>
                  <td>${item.mrp}</td>
                  <td>
                    {
                      <span
                        className={
                          item.quantity <= 10
                            ? "badge bg-danger text-white"
                            : "badge bg-success text-white"
                        }
                        style={{ width: "60px", fontSize: "1.2rem" }}
                      >
                        {item.quantity}
                      </span>
                    }
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateVisibility(item.style_Code)}
                    >
                      {item.visible ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                  <td>
                    <div className="d-flex">
                      <a
                        href={`/edititem/${item.style_Code}`}
                        className="btn btn-danger"
                      >
                        Edit
                      </a>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(item.style_Code)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination justify-content-center">
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(filteredItems.length / itemsPerPage),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button key={index} className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-3 d-flex">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
        <button
          className="btn btn-danger mx-2"
          onClick={handleGenerateReportItems}
        >
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <>
              <i class="fa fa-file-excel mx-2" aria-hidden="true"></i> export
              items report to excel
            </>
          )}
        </button>
        <div className="btn btn-primary">
          <a
            href="/createitem"
            style={{ textDecoration: "none" }}
            className="text-white"
            onClick={() => setCreateItemLoading(true)}
          >
            {createItemLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <>Create New Item</>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminItemList;
