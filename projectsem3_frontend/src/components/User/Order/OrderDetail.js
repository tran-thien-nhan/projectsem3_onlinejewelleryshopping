import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../Context/DataContext";

const OrderDetail = () => {
  const { order_ID } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const { orderListByUserId } = useData();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7241/api/Order/getorderdetail/${order_ID}`
        );
        const data = await response.json();
        console.log(data.data.orderDetailMsts);
        setOrderDetails(data.data.orderDetailMsts);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [order_ID]);

  if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
    return <p>No order details found.</p>;
  }
  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row">
          <form className="col-md-12" method="post">
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-name">Order ID</th>
                    <th className="product-price">Status</th>
                    <th className="product-address">Address</th>
                    <th className="product-quantity">Notes</th>
                    <th className="product-total">Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderListByUserId.map((order) => {
                    if (order.order_ID === order_ID) {
                      return (
                        <tr key={order.order_ID}>
                          <td>{order.order_ID}</td>
                          <td>
                            {order.orderStatus === 1 && (
                              <span className="badge bg-primary">Pending</span>
                            )}
                            {order.orderStatus === 2 && (
                              <span className="badge bg-info">Shipping</span>
                            )}
                            {order.orderStatus === 3 && (
                              <span className="badge bg-success">
                                Completed
                              </span>
                            )}
                            {order.orderStatus === 4 && (
                              <span className="badge bg-danger">Cancel</span>
                            )}
                          </td>
                          <td>{order.order_Address}</td>
                          <td>{order.order_Note || "nothing"}</td>
                          <td>{order.orderDate}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="row mb-5">
          <form className="col-md-12" method="post">
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">MRP</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-total">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((orderDetail) => (
                    <tr key={orderDetail.order_ID}>
                      <td className="product-thumbnail">
                        <img
                          src={
                            orderDetail.itemMst.imagePath ||
                            "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
                          }
                          alt="Image"
                          className="img-fluid"
                        />
                      </td>
                      <td className="product-name">
                        <h2 className="h5 text-black">
                          {orderDetail.itemMst.product_Name}
                        </h2>
                      </td>
                      <td>${orderDetail.mrp}</td>
                      <td>{orderDetail.quantity}</td>
                      <td>${orderDetail.mrp * orderDetail.quantity}</td>
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

export default OrderDetail;
