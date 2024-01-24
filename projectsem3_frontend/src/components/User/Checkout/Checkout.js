import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState({});
  const [billingDetails, setBillingDetails] = useState({
    order_Address: "",
    order_Note: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    var userId = sessionStorage.getItem("userID");

    if (userId === null) {
      setIsLogin(false);
      Swal.fire("Error", "Please login to continue", "error");
      setTimeout(() => {
        Swal.close();
        navigate("/login");
      }, 1000);
    } else {
      setIsLogin(true);
      setUserID(userId);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://localhost:7241/api/Cart/getcartbyuserid/${userId}`
          );
          setCartList(response.data.data);
        } catch (error) {
          console.error("list error:", error);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    let total = 0;
    cartList.forEach((item) => {
      total += item.itemMst.mrp * item.quantity;
    });
    setSubTotal(total);
  }, [cartList]);

  function handleChangeInput(e) {
    let { name, value } = e.target;

    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const order = {
        userID: userID,
        totalPrice: subTotal,
        orderStatus: 1,
        order_Note: billingDetails.order_Note || null,
        order_Address: billingDetails.order_Address || sessionStorage.getItem("address"),
        orderDate: new Date().toISOString(),
        orderDetailMsts: cartList.map((item) => ({
          style_Code: item.itemMst.style_Code,
          product_Name: item.itemMst.product_Name,
          quantity: item.quantity,
          mrp: item.itemMst.mrp,
        })),
        billingDetails: billingDetails,
      };

      console.log(order);

      const response = await axios.post(
        "https://localhost:7241/api/Order/createorder",
        order
      );

      if (response.status === 200) {
        if (response.data && response.data.data) {
          setOrderInfo(response.data.data);
          Swal.fire("Success", "Order placed successfully!", "success");
          setTimeout(() => {
            Swal.close();
            navigate("/thankyou");
          }, 1000);
        } else {
          Swal.fire(
            "Error",
            response.data.status + ": " + response.data.message,
            "error"
          );
        }
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Place order error:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="container my-4">
      <form>
        <div className="row">
          <div className="col-md-6 mb-5 mb-md-0">
            <h2 className="h3 mb-3 text-black">Send To Others</h2>
            <div className="p-3 p-lg-5 border bg-white">
              <div className="form-group row"></div>

              <div className="form-group row mb-2">
                <div className="col-md-12">
                  <label htmlFor="address" className="text-black">
                    Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="order_Address"
                    placeholder="Address"
                    value={billingDetails.order_Address}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="OrderNotes" className="text-black">
                  Order Notes
                </label>
                <textarea
                  name="order_Note"
                  id="OrderNotes"
                  cols="30"
                  rows="5"
                  className="form-control"
                  placeholder="Write your notes here..."
                  value={billingDetails.order_Note}
                  onChange={handleChangeInput}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row mb-5">
              <div className="col-md-12">
                <h2 className="h3 mb-3 text-black">Your Order</h2>
                <div className="p-3 p-lg-5 border bg-white">
                  <table className="table site-block-order-table mb-5">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>MRP</th>
                        <th>Product</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartList.map((item) => {
                        return (
                          <tr key={item.itemMst.productId}>
                            <td className="product-thumbnail">
                              <img
                                src={
                                  item.itemMst.imagePath ||
                                  "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
                                }
                                alt="Image"
                                className="img-fluid"
                                width={100}
                                height={100}
                              />
                            </td>
                            <td>${item.itemMst.mrp}</td>
                            <td>
                              {item.itemMst.product_Name}{" "}
                              <strong className="mx-2">x</strong>{" "}
                              {item.quantity}
                            </td>
                            <td>${item.itemMst.mrp * item.quantity}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td></td>
                        <td></td>
                        <td className="text-black font-weight-bold">
                          <strong>Order Total</strong>
                        </td>
                        <td className="text-black font-weight-bold">
                          <strong>${subTotal}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="form-group">
                    <button
                      className="btn btn-black btn-lg py-3 btn-block"
                      onClick={(e) => handlePlaceOrder(e)}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Checkout;
