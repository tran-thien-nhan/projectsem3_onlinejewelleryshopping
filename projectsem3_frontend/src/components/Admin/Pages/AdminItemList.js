import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useData } from "../../../Context/DataContext";
import { saveAs } from "file-saver";
import axios from "axios";

const AdminItemList = () => {
  const { items, loading, error } = useData();
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mrpSortOrder, setMrpSortOrder] = useState("");

  const handleGenerateReportItems = async () => {
    try {
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
      setMrpSortOrder(""); // Đặt thứ tự sắp xếp của `mrp` về mặc định
    } else if (field === "mrp") {
      setMrpSortOrder(mrpSortOrder === "asc" ? "desc" : "asc");
      setSortOrder(""); // Đặt thứ tự sắp xếp của `quantity` về mặc định
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = sortedItems.filter(
    (item) =>
      item.style_Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReset = () => {
    setSearchTerm("");
    setSortOrder("");
    setMrpSortOrder("");
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
          <i className="fas fa-download fa-sm text-white-50 mx-2"></i> export
          items report to excel
        </button>
      </div>
    </div>
  );
};

export default AdminItemList;
