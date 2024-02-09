import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { order_ID } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const { orderListByUserId } = useData();
  const [orderPayment, setOrderPayment] = useState("");
  const [foundOrder, setFoundOrder] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOutside = (event) => {
    if (openForm && !event.target.closest("form")) {
      setOpenForm(false);
    }
  };

  useEffect(() => {
    navigate(`/order/${order_ID}`);
  }, [order_ID]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7241/api/Order/getorderdetail/${order_ID}`
        );
        const data = await response.json();
        setOrderDetails(data.data.orderDetailMsts);

        const foundOrder = orderListByUserId.find(
          (order) => order.order_ID === order_ID
        );
        if (foundOrder) {
          setOrderPayment(foundOrder.orderPayment);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [order_ID, orderListByUserId]); // Only include necessary dependencies

  if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
    return <p>No order details found.</p>;
  }

  const orderIsCancelable =
    orderPayment === 1 &&
    orderListByUserId.find((order) => order.order_ID === order_ID)
      ?.orderStatus === 1;

  const handleCancelOrder = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setOpenForm(true);
  };

  const handleSubmitCancelForm = async (e) => {
    e.preventDefault();
    const cancelReason = e.target.elements.exampleFormControlTextarea1.value;
    if (cancelReason === "") {
      setCancelReason("blank");
    } else {
      setCancelReason(cancelReason);
    }
    try {
      setIsLoading(true);
      const response = await axios.put(
        `https://localhost:7241/api/Order/cancelorder/${order_ID}/${cancelReason}`,
        { cancelReason: cancelReason }
      );

      if (!response.data.success) {
        console.log("Order cancelled successfully");
        // Handle success, e.g. display success message, navigate, etc.
        await window.location.reload();
      } else {
        console.error("Error cancelling order:", response.data.message);
        // Handle error, e.g. display error message
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error cancelling order:", error);
      // Handle general error
    } finally {
      setIsLoading(false);
      setOpenForm(false); // Close the form after processing
    }
  };

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row">
          <form className="col-md-12" method="post">
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-name">{t("Order ID")}</th>
                    <th className="product-price">{t("Status")}</th>
                    <th className="product-address">{t("Address")}</th>
                    <th className="product-quantity">{t("Phone Number")}</th>
                    <th className="product-quantity">
                      {t("Order Payment Method")}
                    </th>
                    <th className="product-quantity">{t("Notes")}</th>
                    {cancelReason === "" && (
                      <th className="product-quantity">{t("Cancel Reason")}</th>
                    )}
                    <th className="product-total">{t("Order Date")}</th>
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
                              <span className="badge bg-primary">
                                {t("Pending")}
                              </span>
                            )}
                            {order.orderStatus === 2 && (
                              <span className="badge bg-info">
                                {t("Shipping")}
                              </span>
                            )}
                            {order.orderStatus === 3 && (
                              <span className="badge bg-success">
                                {t("Completed")}
                              </span>
                            )}
                            {order.orderStatus === 4 && (
                              <span className="badge bg-danger">
                                {t("Cancel")}
                              </span>
                            )}
                          </td>
                          <td>{order.order_Address}</td>
                          <td>{order.order_MobNo}</td>
                          <td>
                            {order.orderPayment === 1
                              ? t("by cash")
                              : order.orderPayment === 2
                              ? t("by credit card")
                              : order.orderPayment === 3
                              ? t("by momo")
                              : ""}
                          </td>
                          <td>{t(order.order_Note) || t("nothing")}</td>
                          {cancelReason === "" && <td>{order.cancelreason}</td>}
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
                    <th className="product-thumbnail">{t("Image")}</th>
                    <th className="product-name">{t("Product")}</th>
                    <th className="product-price">{t("MRP")}</th>
                    <th className="product-quantity">{t("Quantity")}</th>
                    <th className="product-total">{t("Total")}</th>
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
          <div className="row">
            {orderIsCancelable && (
              <button className="btn btn-warning" onClick={handleCancelOrder}>
                {t("Cancel This Order")}
              </button>
            )}
            {openForm && (
              <form onSubmit={handleSubmitCancelForm} className="my-2">
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    {t("Reason for cancellation")}
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary my-2">
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <>{t("Submit")}</>
                  )}
                </button>
              </form>
            )}
            <a href="/order" className="btn btn-primary my-2">
              {t("Back")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
