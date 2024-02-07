import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Radio, TailSpin } from "react-loader-spinner";

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});
  const [billingDetails, setBillingDetails] = useState({
    order_Address: "",
    order_Note: "",
    order_MobNo: "", // Add order_MobNo state
  });
  const [isLogin, setIsLogin] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    setLoading(true);
    const userId = sessionStorage.getItem("userID");
    if (!userId) {
      setIsLogin(false);
      Swal.fire("Error", "Please login to continue", "error").then(() => {
        navigate("/login");
      });
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
        } finally {
          setLoading(false);
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
    const { name, value } = e.target;

    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // if (billingDetails.order_MobNo.length < 10) { // Check if length is less than 10
    //   Swal.fire("Error", "Please enter valid phone number", "error");
    //   return;
    // }

    let paymentOption = "cash"; // Default

    setLoading(true);
    try {
      const cashChecked = document.getElementById("cash").checked; // Kiểm tra xem radio button 'cash' đã được chọn chưa
      const orderPayment = cashChecked ? 1 : 2; // Thiết lập giá trị cho orderPayment tùy thuộc vào phương thức thanh toán

      const creditCardNo = cashChecked
        ? null
        : document.getElementById("creditCardNo").value; // Lấy giá trị của số thẻ tín dụng nếu thanh toán bằng credit card
      const cvv = cashChecked ? null : document.getElementById("cvv").value; // Lấy giá trị của mã CVV nếu thanh toán bằng credit card

      // Kiểm tra định dạng số thẻ tín dụng
      const creditCardRegex = /^[0-9]{16}$/;
      if (!creditCardRegex.test(creditCardNo)) {
        Swal.fire("Error", "Credit Card Number must be 16 digits", "error");
        return;
      }

      // Kiểm tra định dạng CVV
      const cvvRegex = /^[0-9]{3,4}$/;
      if (!cvvRegex.test(cvv)) {
        Swal.fire("Error", "CVV must be 3 or 4 digits", "error");
        return;
      }
      
      const order = {
        userID: userID,
        totalPrice: subTotal,
        orderStatus: 1,
        order_Note: billingDetails.order_Note || "blank",
        order_Address:
          billingDetails.order_Address || sessionStorage.getItem("address"),
        order_MobNo:
          billingDetails.order_MobNo || sessionStorage.getItem("mobNo"),
        orderDate: new Date().toISOString(),
        orderPayment: orderPayment,
        creditCardNo: creditCardNo,
        cvv: cvv,
        orderDetailMsts: cartList.map((item) => ({
          style_Code: item.itemMst.style_Code,
          product_Name: item.itemMst.product_Name,
          quantity: item.quantity,
          mrp: item.itemMst.mrp,
        })),
        billingDetails: billingDetails,
      };

      console.log(order);

      const responseCheck = await axios.get(
        `https://localhost:7241/api/Order/checkquantity/${userID}`,
        { data: order }
      );

      console.log(responseCheck);

      if (responseCheck.data === 1) {
        setLoading(false);
        const result = await Swal.fire({
          title: "Warning",
          text: "Not enough quantity available for some items, do you want to buy all ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Agree",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
          const response = await axios.put(
            `https://localhost:7241/api/Order/updatecartgetallquantity/${userID}`,
            order
          );
          // Swal.fire("Success!", "Agree to place order!", "success");
          window.location.reload();
        }
      }
      if (responseCheck.data === 0) {
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
            }, 2000);
          } else {
            Swal.fire("Error", response.data.message, "error");
          }
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      }
    } catch (error) {
      console.error("Place order error:", error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
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
        <form>
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Send To Others</h2>
              <div className="p-3 p-lg-5 border bg-white">
                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="address" className="text-black">
                      Mob No <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobno"
                      name="order_MobNo"
                      placeholder="phone number"
                      value={billingDetails.order_MobNo}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>

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

                    <div className="mx-4 mb-3 text-dark">
                      <h5>Payment Methods:</h5>
                    </div>

                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0">
                        <a
                          className="d-block"
                          data-bs-toggle="collapse"
                          href="#collapsebank"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapsebank"
                        >
                          Cash Payment
                        </a>
                      </h3>

                      <div className="collapse" id="collapsebank">
                        <div className="py-2">
                          <input type="radio" name="payment" id="cash" />
                          <label htmlFor="cash" className="mx-2">
                            Pay By Cash
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0">
                        <a
                          className="d-block"
                          data-bs-toggle="collapse"
                          href="#collapsecheque"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapsecheque"
                        >
                          Credit Card
                        </a>
                      </h3>

                      <div className="collapse" id="collapsecheque">
                        <div className="py-2">
                          <form action="#">
                            <div className="form-group">
                              <label
                                htmlFor="creditCardNo"
                                className="text-black"
                              >
                                Card Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="creditCardNo"
                                name="creditCardNo"
                                placeholder="Enter Cart Number"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="cvv" className="text-black">
                                CVV
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="cvv"
                                name="cvv"
                                placeholder="Enter CVV"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="form-group d-flex">
                      <button
                        className="btn btn-black btn-lg py-3 btn-block"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </button>
                      <a
                        href="/cart"
                        className="btn btn-primary btn-lg py-3 mx-2"
                      >
                        Back To Cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
export default Checkout;
