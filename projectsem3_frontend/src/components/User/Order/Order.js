import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { t, i18n } = useTranslation();
  const { orderListSort } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Calculate the index of the first and last order on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderListSort.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div class="untree_co-section before-footer-section">
      <div class="container">
        <div class="row mb-5">
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table">
                <thead>
                  <tr>
                    <th>{t("Order ID")}</th>
                    <th class="product-price">{t("Total Price")}</th>
                    <th class="product-quantity">{t("Status")}</th>
                    <th class="product-total">{t("Notes")}</th>
                    <th class="product-total">{t("Address")}</th>
                    <th class="product-total">{t("Mobile Number")}</th>
                    <th class="product-total">{t("Order Date")}</th>
                    <th class="product-total">{t("Order Payment")}</th>
                    <th class="product-remove">{t("Detail")}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.order_ID}>
                      <td>{order.order_ID}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.orderStatus === 1 && (
                          <span className="badge bg-primary">{t("Pending")}</span>
                        )}
                        {order.orderStatus === 2 && (
                          <span className="badge bg-info">{t("Shipping")}</span>
                        )}
                        {order.orderStatus === 3 && (
                          <span className="badge bg-success">{t("Completed")}</span>
                        )}
                        {order.orderStatus === 4 && (
                          <span className="badge bg-danger">{t("Cancel")}</span>
                        )}
                      </td>
                      <td>{t(order.order_Note) || "nothing"}</td>
                      <td>{order.order_Address}</td>
                      <td>{order.order_MobNo}</td>
                      <td>{order.orderDate}</td>
                      <td>
                        {order.orderPayment === 1
                          ? t("by cash")
                          : order.orderPayment === 2
                          ? t("by credit card")
                          : order.orderPayment === 3
                          ? t("by momo")
                          : ""}
                      </td>
                      <td>
                        <Link
                          to={`/order/${order.order_ID}`}
                          class="btn btn-black btn-sm"
                        >
                          {t("Detail")}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-md-12">
            <nav>
              <ul class="pagination justify-content-center">
                {Array.from({ length: Math.ceil(orderListSort.length / ordersPerPage) }).map((_, index) => (
                  <li key={index} class={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                    <button class="page-link" onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
