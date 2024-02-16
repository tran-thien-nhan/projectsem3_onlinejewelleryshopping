import React, { useState } from "react";
import { useData } from "../../../Context/DataContext";
import { TailSpin } from "react-loader-spinner";
import { saveAs } from "file-saver";
import axios from "axios";
import PageHeading from "../PageHeading";
import { Card } from "react-bootstrap";
import CardEarning from "../CardEarning";
import CardEarning1 from "../CardEarning1";
import CardEarning2 from "../CardEarning2";
import CardEarning3 from "../CardEarning3";
import CardEarning4 from "../CardEarning4";
import CardEarning5 from "../CardEarning5";
import CardEarning6 from "../CardEarning6";
import CardEarning7 from "../CardEarning7";
import CardEarning8 from "../CardEarning8";
import CardEarning9 from "../CardEarning9";
import CardEarning10 from "../CardEarning10";
import CardEarning11 from "../CardEarning11";

const AdminAllOrders = () => {
  const { allOrderList, loading, error } = useData();
  const [sortOrderDate, setSortOrderDate] = useState("desc");
  const [searchOrderID, setSearchOrderID] = useState("");
  const [filterOrderStatus, setFilterOrderStatus] = useState("");
  const [searchUserID, setSearchUserID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOrderPayment, setFilterOrderPayment] = useState("");

  const handleFilterOrderPaymentChange = (e) => {
    setFilterOrderPayment(e.target.value);
  };

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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
    setFilterOrderPayment("");
    setCurrentPage(1);
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `https://localhost:7241/api/Order/updateorderstatus/${orderId}/${status}`
      );
      // Update the order status in the local state or fetch the updated order list
      await window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
    )
    .filter((order) =>
      filterOrderPayment === ""
        ? true
        : order.orderPayment.toString() === filterOrderPayment
    );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrderList.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid row">
      <PageHeading text="All Orders" />
      <div className="d-flex flex-wrap">
        <CardEarning className="flex-fill" />
        <CardEarning6 className="flex-fill" />
        <CardEarning7 className="flex-fill" />
        <CardEarning2 className="flex-fill" />
      </div>
      <div className="d-flex flex-wrap">
        <CardEarning10 className="flex-fill" />
        <CardEarning3 className="flex-fill" />
        <CardEarning4 className="flex-fill" />
        <CardEarning1 className="flex-fill" />
      </div>
      <div className="d-flex flex-wrap">
        <CardEarning5 className="flex-fill" />
        <CardEarning8 className="flex-fill" />
        <CardEarning11 className="flex-fill" />
        <CardEarning9 className="flex-fill" />
      </div>
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
          <div className="mb-3">
            <label htmlFor="filterOrderPayment" className="form-label">
              Filter by Payment Method
            </label>
            <select
              className="form-select"
              id="filterOrderPayment"
              value={filterOrderPayment}
              onChange={handleFilterOrderPaymentChange}
            >
              <option value="">All</option>
              <option value="1">Cash</option>
              <option value="2">Credit Card</option>
              <option value="3">Momo</option>
            </select>
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
                  Order Date {sortOrderDate === "asc" ? "▲" : "▼"}
                </a>
              </th>
              <th scope="col">Total Amount</th>
              <th scope="col">Payment Methods</th>
              <th scope="col">Order Status</th>
              <th scope="col">Action</th>
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
              currentOrders.map((order) => (
                <tr key={order.order_ID}>
                  <td>
                    {order.order_ID}{" "}
                    <span className={isNewOrder(order) ? "new-order" : ""}>
                      {isNewOrder(order) ? "(new)" : ""}
                    </span>
                  </td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.orderPayment === 1
                      ? "by cash"
                      : order.orderPayment === 2
                      ? "by credit card"
                      : order.orderPayment === 3
                      ? "by momo"
                      : ""}
                  </td>

                  <td>
                    {order.orderStatus === 1 && (
                      <span className="badge bg-primary">Pending</span>
                    )}
                    {order.orderStatus === 2 && (
                      <span className="badge bg-info">Shipping</span>
                    )}
                    {order.orderStatus === 3 && (
                      <span className="badge bg-success">Completed</span>
                    )}
                    {order.orderStatus === 4 && (
                      <span className="badge bg-danger">Cancel</span>
                    )}
                  </td>
                  <td>
                    <a
                      href={`/order/${order.order_ID}`}
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </a>
                    <select
                      className="form-select"
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleUpdateOrderStatus(
                          order.order_ID,
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value={1}>Pending</option>
                      <option value={2}>Shipping</option>
                      <option value={3}>Completed</option>
                      {/* <option value={4}>Cancel</option> */}
                    </select>
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
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <>
              <i class="fa fa-file-excel mx-2" aria-hidden="true"></i> export
              order report to excel
            </>
          )}
        </button>
      </div>
      <div className="pagination justify-content-center">
        <ul className="pagination">
          {Array.from({
            length: Math.ceil(filteredOrderList.length / ordersPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAllOrders;
