import React, { useState } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import { saveAs } from "file-saver";
import axios from "axios";

const AdminAllOrders = () => {
  const { allOrderList, loading, error } = useData();
  const [sortOrderDate, setSortOrderDate] = useState("desc");
  const [searchOrderID, setSearchOrderID] = useState("");
  const [filterOrderStatus, setFilterOrderStatus] = useState("");
  const [searchUserID, setSearchUserID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const isNewOrder = (order) => {
    const today = new Date();
    const orderDate = new Date(order.orderDate);
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  };

  const handleGenerateReportOrder = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const response = await axios.get(
        `https://localhost:7241/api/Order/exportexcelorders`,
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/xlsx" });
      saveAs(blob, `Order_Report_${formattedDate}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };

  const sortedOrderList = allOrderList.sort((a, b) => {
    if (sortOrderDate === "asc") {
      return new Date(a.orderDate) - new Date(b.orderDate);
    } else {
      return new Date(b.orderDate) - new Date(a.orderDate);
    }
  });

  const handleSortOrderDateChange = () => {
    setSortOrderDate(sortOrderDate === "asc" ? "desc" : "asc");
  };

  const handleSearchOrderIDChange = (e) => {
    setSearchOrderID(e.target.value);
  };

  const handleFilterOrderStatusChange = (e) => {
    setFilterOrderStatus(e.target.value);
  };

  const handleSearchUserIDChange = (e) => {
    setSearchUserID(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleReset = () => {
    setSortOrderDate("desc");
    setSearchOrderID("");
    setFilterOrderStatus("");
    setSearchUserID("");
    setStartDate("");
    setEndDate("");
  };

  const filteredOrderList = sortedOrderList
    .filter((order) => order.order_ID.toString().includes(searchOrderID))
    .filter((order) =>
      filterOrderStatus === ""
        ? true
        : order.orderStatus.toString() === filterOrderStatus
    )
    .filter((order) => order.userID.toString().includes(searchUserID))
    .filter(
      (order) =>
        startDate === "" || new Date(order.orderDate) >= new Date(startDate)
    )
    .filter(
      (order) =>
        endDate === "" || new Date(order.orderDate) <= new Date(endDate)
    );

  return (
    <div className="container-fluid">
      <div className="container-fluid d-flex">
        <div className="col-6 mx-2">
          <div className="mb-3">
            <label htmlFor="searchOrderID" className="form-label">
              Search by Order ID
            </label>
            <input
              type="text"
              className="form-control"
              id="searchOrderID"
              value={searchOrderID}
              onChange={handleSearchOrderIDChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="searchUserID" className="form-label">
              Search by User ID
            </label>
            <input
              type="text"
              className="form-control"
              id="searchUserID"
              value={searchUserID}
              onChange={handleSearchUserIDChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="filterOrderStatus" className="form-label">
              Filter by Order Status
            </label>
            <select
              className="form-select"
              id="filterOrderStatus"
              value={filterOrderStatus}
              onChange={handleFilterOrderStatusChange}
            >
              <option value="">All</option>
              <option value="1">Pending</option>
              <option value="2">Shipping</option>
              <option value="3">Completed</option>
              <option value="4">Cancel</option>
            </select>
          </div>
        </div>
        <div className="col-6 mx-2">
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
      </div>
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">
                <a
                  className=""
                  style={{ cursor: "pointer", textDecoration: "none" }}
                  onClick={() => handleSortOrderDateChange()}
                >
                  Order Date{" "}
                  {sortOrderDate === "asc"
                    ? "(old to new) ▲"
                    : "(new to old) ▼"}
                </a>
              </th>
              <th scope="col">User ID</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  <TailSpin color="#00BFFF" height={80} width={80} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center">
                  <h3>{error.message}</h3>
                </td>
              </tr>
            ) : (
              filteredOrderList.map((order) => (
                <tr key={order.order_ID}>
                  <td className={isNewOrder(order) ? "new-order" : ""}>
                    {order.order_ID}
                  </td>
                  <td className={isNewOrder(order) ? "new-order" : ""}>
                    {new Date(order.orderDate).toLocaleString()}
                  </td>
                  <td className={isNewOrder(order) ? "new-order" : ""}>
                    {order.userID}
                  </td>
                  <td className={isNewOrder(order) ? "new-order" : ""}>
                    ${order.totalPrice}
                  </td>
                  <td className={isNewOrder(order) ? "new-order" : ""}>
                    {order.orderStatus === 1 && "pending"}
                    {order.orderStatus === 2 && "shipping"}
                    {order.orderStatus === 3 && "completed"}
                    {order.orderStatus === 4 && "cancel"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-3 d-flex">
        <button className="btn btn-secondary mx-2" onClick={handleReset}>
          Reset
        </button>
        <button
          className="btn btn-danger mx-2"
          onClick={handleGenerateReportOrder}
        >
          <i className="fas fa-download fa-sm text-white-50 mx-2"></i> export
          order report to excel
        </button>
      </div>
    </div>
  );
};

export default AdminAllOrders;
