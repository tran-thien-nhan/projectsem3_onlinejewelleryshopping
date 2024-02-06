import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import axios from "axios";
import { saveAs } from "file-saver";

const AdminOrderDetail = () => {
  const { order_ID } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7241/api/Order/getorderdetail/${order_ID}`
        );
        const data = await response.json();
        console.log(data.data.orderDetailMsts);
        setOrderDetails(data.data.orderDetailMsts);
        setOrderData(data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [order_ID]);

  if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
    return <p>No order details found.</p>;
  }

  const exportPDF = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://localhost:7241/api/Order/exportpdforderdetails/${order_ID}`,
        { responseType: "blob" } // Important for receiving binary data
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, `Order_${order_ID}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid">
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
                    width={100}
                    height={100}
                  />
                </td>
                <td className="product-name">
                  <p className="text-black">
                    {orderDetail.itemMst.product_Name}
                  </p>
                </td>
                <td>${orderDetail.mrp}</td>
                <td>{orderDetail.quantity}</td>
                <td>${orderDetail.mrp * orderDetail.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Order Details</h2>
        <table className="table">
          <tbody>
            <tr>
              <td>Order ID:</td>
              <td>{orderData.order_ID}</td>
            </tr>
            <tr>
              <td>User ID:</td>
              <td>
                <div className="d-flex">
                  <div className="mx-2">{orderData.userID}</div>
                  <div className="mx-2">
                    <a
                      href={`/user/${orderData.userID}`}
                      style={{ fontWeight: "bold", color: "red" }}
                    >
                      Click for more info
                    </a>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Total Price:</td>
              <td>${orderData.totalPrice.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Order Address:</td>
              <td>{orderData.order_Address}</td>
            </tr>
            <tr>
              <td>Mobile Number:</td>
              <td>{orderData.order_MobNo}</td>
            </tr>
            <tr>
              <td>Order Note:</td>
              <td>{orderData.order_Note}</td>
            </tr>
            <tr>
              <td>Order Status:</td>
              <td>
                {orderData.orderStatus === 1 && (
                  <span className="badge bg-primary">Pending</span>
                )}
                {orderData.orderStatus === 2 && (
                  <span className="badge bg-info">Shipping</span>
                )}
                {orderData.orderStatus === 3 && (
                  <span className="badge bg-success">Completed</span>
                )}
                {orderData.orderStatus === 4 && (
                  <span className="badge bg-danger">Cancel</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Order Date:</td>
              <td>{new Date(orderData.orderDate).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-warning my-2" onClick={exportPDF}>
        {isLoading ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <>
            <i class="fa fa-file-pdf mx-2" aria-hidden="true"></i>
            Export This Order To PDF
          </>
        )}
      </button>
    </div>
  );
};

export default AdminOrderDetail;
