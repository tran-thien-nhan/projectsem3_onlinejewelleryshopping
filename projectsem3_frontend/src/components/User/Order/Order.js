import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useData } from "../../../Context/DataContext";

const Order = () => {
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
                    <th>Order ID</th>
                    <th class="product-price">Total Price</th>
                    <th class="product-quantity">Status</th>
                    <th class="product-total">Notes</th>
                    <th class="product-total">Address</th>                    
                    <th class="product-total">Order Date</th>
                    <th class="product-remove">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {orderListSort.map((order) => (
                    <tr>
                      <td>{order.order_ID}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.orderStatus === 1 && "pending"}
                        {order.orderStatus === 2 && "shipping"}
                        {order.orderStatus === 3 && "completed"}
                        {order.orderStatus === 4 && "cancelled"}
                      </td>
                      <td>{order.order_Note || "nothing"}</td>
                      <td>{order.order_Address}</td>                      
                      <td>{order.orderDate}</td>
                      <td>
                        <Link
                          to={`/order/${order.order_ID}`}
                          class="btn btn-black btn-sm"
                        >
                          Detail
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
