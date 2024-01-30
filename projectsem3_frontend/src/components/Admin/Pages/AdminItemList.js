import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useData } from "../../../Context/DataContext";
import { saveAs } from "file-saver";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const AdminItemList = () => {
  const { items, loading, error } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mrpSortOrder, setMrpSortOrder] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");

  const handleVisibilityFilterChange = (filter) => {
    setVisibilityFilter(filter);
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

    return matchesSearchTerm && matchesVisibilityFilter;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSortOrder("");
    setMrpSortOrder("");
    setVisibilityFilter("all");
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

  return (
    <div className="container-fluid">
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

      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product ID</th>
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
              filteredItems.map((item) => (
                <tr key={item.style_Code}>
                  <td>{item.style_Code}</td>
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
                  <td>{item.mrp}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateVisibility(item.style_Code)}
                    >
                      {item.visible ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
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
          >
            Create New Item
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminItemList;
