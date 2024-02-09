import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import Swal from "sweetalert2";
const Thankyou = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Extract orderID and order data from session storage
    const orderID = sessionStorage.getItem("orderID");
    const orderData = JSON.parse(sessionStorage.getItem("order")); // Assuming 'order' is valid JSON
    const orderinfo = JSON.parse(localStorage.getItem("orderInfo"));

    console.log("orderid: ", orderID);
    console.log("order: ", orderData);

    if (!orderID || !orderData) {
      window.location.href = "/";
      return; // Exit early if data is missing
    }

    if (orderData.orderPayment !== 3) {
      console.error("Invalid payment method specified.");
      return; // Exit early if payment method is not 3
    }
    else{
      const userID = orderData.userID;
      orderData.orderID = orderinfo.orderID;
      orderData.paymenturl = orderinfo.payUrl;
  
      // Check quantity availability for all items in the order
      const checkQuantity = async () => {
        const checkQuantityResponse = await axios.get(
          `https://localhost:7241/api/Order/checkquantity/${userID}`,
          { data: orderData }
        );
  
        const createOrderResponse = await axios.post(
          "https://localhost:7241/api/Order/createorder",
          orderData
        );
  
        if (createOrderResponse.status === 200) {
          if (createOrderResponse.data && createOrderResponse.data.data) {
            console.log(createOrderResponse.data.data);
            // Store order information (consider security and privacy implications)
            localStorage.setItem("orderInfo", JSON.stringify(createOrderResponse.data.data));
  
            //Swal.fire("Thành công", "Đặt hàng thành công!", "success");
            sessionStorage.removeItem("order");
            sessionStorage.removeItem("orderID"); // Also remove orderID
            sessionStorage.removeItem("orderInfo");
            setTimeout(() => {
              window.location.href = "/thankyou";
            }, 2000);
          } else {
            setLoading(false);
            // Swal.fire("Lỗi", createOrderResponse.data.message, "error");
            console.log(createOrderResponse.data.message);
          }
        } else {
          setLoading(false);
          // Swal.fire("Lỗi", createOrderResponse.data.message, "error");
          console.log(createOrderResponse.data.message);
        }
      };
  
      checkQuantity();
  
      //setLoading(true);
      return;
    }

    
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TailSpin color="red" radius={8} />
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12 text-center pt-5">
            <span className="display-3 thankyou-icon text-primary">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-cart-check mb-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                />
              </svg>
            </span>
            <h2 className="display-3 text-black">Thank you!</h2>
            <p className="lead mb-5">Your order was successfully completed.</p>
            <p>
              <a href="/" className="btn btn-sm btn-outline-black">
                Back to shop
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Thankyou;
