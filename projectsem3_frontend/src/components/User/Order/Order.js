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
                  {orderListSort.map((order) => (
                    <tr>
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
                          ? "by cash"
                          : order.orderPayment === 2
                          ? "by credit card"
                          : order.orderPayment === 3
                          ? "by momo"
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
      </div>
    </div>
  );
};

export default Order;
