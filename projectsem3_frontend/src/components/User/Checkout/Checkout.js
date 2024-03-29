import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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
  const [paymentMethod, setPaymentMethod] = useState(1); // Default payment method is cash
  const [otp, setOtp] = useState(""); // Add OTP state
  const [otpSent, setOtpSent] = useState(false); // Add OTP sent state
  const [otpVerified, setOtpVerified] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [newotp, setNewOtp] = useState("");
  const [otpSentTime, setOtpSentTime] = useState(null);


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

  const handleSendOTP = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setOpenForm(true);
    try {
      setLoading(true);
      var useremail = sessionStorage.getItem("email");
      const responseotp = await axios.get(
        `https://localhost:7241/api/Order/sendmailotp/${useremail}`
      );
      if (responseotp.status === 200) {
        setOtpSentTime(Date.now());
        setNewOtp(responseotp.data.data);
        setOtpSent(true);
        setLoading(false);
        //setOpenForm(true);
      } else {
        setNewOtp("");
        setOtpSent(false);
        setLoading(false);
        setOpenForm(false);
        Swal.fire("Error", responseotp.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
      setOpenForm(false);
      console.error("Send OTP error:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!otp) {
      Swal.fire(t("Error"), t("Please enter OTP"), "error");
      return;
    }

    if (otp !== newotp) {
      Swal.fire(t("Error"), t("Wrong Or Invalid OTP"), "error");
      return;
    }
    //expire otp
    else if (Date.now() - otpSentTime > 60000) { // 60000 milliseconds = 1 minute
      setNewOtp("");
      Swal.fire(t("Error"), t("OTP has expired"), "error");
      return;
    }
    

    setOpenForm(false);

    setLoading(true);
    try {
      let orderPayment;
      let creditCardNo;
      let cvv;

      switch (paymentMethod) {
        case 1: // Cash
          orderPayment = 1;
          creditCardNo = null;
          cvv = null;
          break;
        case 2: // Credit Card
          orderPayment = 2;
          creditCardNo = document.getElementById("creditCardNo").value;
          cvv = document.getElementById("cvv").value;
          break;
        case 3: // Momo
          orderPayment = 3;
          creditCardNo = null;
          cvv = null;
          break;
        default:
          orderPayment = 1;
          creditCardNo = null;
          cvv = null;
      }

      const order = {
        orderID: 0,
        userID: userID,
        totalPrice: subTotal,
        orderStatus: 1,
        paymenturl: "abc",
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

      const responseCheck = await axios.get(
        `https://localhost:7241/api/Order/checkquantity/${userID}`,
        { data: order }
      );

      if (responseCheck.data === 1) {
        setLoading(false);
        const result = await Swal.fire({
          title: t("Warning"),
          text: t("Not enough quantity available for some items, do you want to buy all?"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: t("Agree"),
          cancelButtonText: t("Cancel"),
        });

        if (result.isConfirmed) {
          const response = await axios.put(
            `https://localhost:7241/api/Order/updatecartgetallquantity/${userID}`,
            order
          );
          window.location.reload();
        }
      }

      if(orderPayment === 2){
        if(creditCardNo === "" || cvv === ""){
          Swal.fire(t("Error"), t("Please enter credit card number and cvv"), "error");
          return;
        }

        if(creditCardNo.length !== 16){
          Swal.fire(t("Error"), t("Credit card number must be 16 digits!"), "error");
          return;
        }

        if(cvv.length < 3){
          Swal.fire(t("Error"), t("CVV must be 3-4 digits!"), "error");
          return;
        }
      }

      if (orderPayment === 3) {
        setLoading(false);

        const response = await Swal.fire({
          title: t("Momo Payment"),
          text: t("Do you want to proceed with Momo payment?"),
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: t("Yes"),
          cancelButtonText: t("No"),
        });

        if (response.isConfirmed) {
          if(subTotal * 24000 > 30000000){
            Swal.fire(t("Error"), t("Momo payment limit is 1250 $"), "error");
            return;
          }
          setLoading(false);
          try {
            const modelmomo = await axios.post(
              "https://localhost:7241/api/Order/createmomopayment",
              order
            );

            if (modelmomo.status === 200) {
              setLoading(true);
              if (modelmomo.data && modelmomo.data.data) {
                console.log(modelmomo.data.data);
                if (modelmomo.data.data.errorMessages !== null) {
                  console.log(modelmomo.data.data.errorMessages);
                  Swal.fire(
                    "Error",
                    modelmomo.data.data.errorMessages,
                    "error"
                  );
                } else {
                  var orderid = modelmomo.data.data.result.orderId;
                  console.log("Order ID: ", orderid);
                  sessionStorage.setItem("orderID", orderid);
                  sessionStorage.setItem("order", JSON.stringify(order));
                  sessionStorage.setItem(
                    "orderInfo",
                    JSON.stringify(modelmomo.data.data)
                  );
                  window.location.href = modelmomo.data.data.result.payUrl;
                  console.log(modelmomo.data.data);
                }
              } else {
                console.log(modelmomo.data);
                Swal.fire("Error", modelmomo.data.ErrorMessages, "error");
              }
            }
            return;
          } catch (error) {
            console.error("Momo payment error:", error);
            Swal.fire("Error", error.message, "error");
            return;
          }
        } else {
          setLoading(false);
          return;
        }
      }

      if (responseCheck.data === 0) {
        const response = await axios.post(
          "https://localhost:7241/api/Order/createorder",
          order
        );

        if (response.status === 200) {
          if (response.data && response.data.data) {
            console.log(response.data.data);
            setOrderInfo(response.data.data);
            Swal.fire(t("Success"), t("Order placed successfully!"), "success");
            sessionStorage.removeItem("order");
            setTimeout(() => {
              Swal.close();
              navigate("/thankyou1");
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
      <form>
        <div className="row">
          <div className="col-md-6 mb-5 mb-md-0">
            <h2 className="h3 mb-3 text-black">{t("Send To Others")}</h2>
            <div className="p-3 p-lg-5 border bg-white">
              <input
                type="hidden"
                name="orderID"
                value={billingDetails.orderID}
              />
              <div className="form-group row">
                <div className="col-md-12">
                  <label htmlFor="mobno" className="text-black">
                    {t("Mob No")} <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobno"
                    name="order_MobNo"
                    placeholder={t("phone number")}
                    value={billingDetails.order_MobNo || sessionStorage.getItem("mobNo")}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className="form-group row mb-2">
                <div className="col-md-12">
                  <label htmlFor="address" className="text-black">
                    {t("Address")} <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="order_Address"
                    placeholder={t("Address")}
                    value={billingDetails.order_Address || sessionStorage.getItem("address")}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="OrderNotes" className="text-black">
                  {t("Order Notes")}
                </label>
                <textarea
                  name="order_Note"
                  id="OrderNotes"
                  cols="30"
                  rows="5"
                  className="form-control"
                  placeholder={t("Write your notes here...")}
                  value={billingDetails.order_Note}
                  onChange={handleChangeInput}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row mb-5">
              <div className="col-md-12">
                <h2 className="h3 mb-3 text-black">{t("Your Order")}</h2>
                <div className="p-3 p-lg-5 border bg-white">
                  <table className="table site-block-order-table mb-5">
                    <thead>
                      <tr>
                        <th>{t("Image")}</th>
                        <th>{t("MRP")}</th>
                        <th>{t("Product")}</th>
                        <th>{t("Total")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartList.map((item) => (
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
                            <strong className="mx-2">x</strong> {item.quantity}
                          </td>
                          <td>${(item.itemMst.mrp * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td className="text-black font-weight-bold">
                          <strong>{t("Order Total")}</strong>
                        </td>
                        <td className="text-black font-weight-bold">
                          <strong>${subTotal.toFixed(2)}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Payment Methods */}
                  <div className="mx-4 mb-3 text-dark">
                    <h5>{t("Payment Methods")}:</h5>
                  </div>

                  <div className="border p-3 mb-3">
                    <h3 className="h6 mb-0">
                      <a
                        className="d-block"
                        data-bs-toggle="collapse"
                        href="#collapseCash"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseCash"
                      >
                        {t("Cash Payment")}
                      </a>
                    </h3>

                    <div className="collapse" id="collapseCash">
                      <div className="py-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="cash"
                          value="1"
                          checked={paymentMethod === 1}
                          onChange={() => setPaymentMethod(1)}
                        />
                        <label htmlFor="cash" className="mx-2">
                          {t("Pay By Cash")}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border p-3 mb-3">
                    <h3 className="h6 mb-0">
                      <a
                        className="d-block"
                        data-bs-toggle="collapse"
                        href="#collapseMomo"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseMomo"
                      >
                        {t("Momo Payment")}
                      </a>
                    </h3>

                    <div className="collapse" id="collapseMomo">
                      <div className="py-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="momo"
                          value="3"
                          checked={paymentMethod === 3}
                          onChange={() => setPaymentMethod(3)}
                        />
                        <label htmlFor="momo" className="mx-2">
                          {t("Pay By Momo")}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border p-3 mb-3">
                    <h3 className="h6 mb-0">
                      <a
                        className="d-block"
                        data-bs-toggle="collapse"
                        href="#collapseCreditCard"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseCreditCard"
                      >
                        {t("Credit Card")}
                      </a>
                    </h3>

                    <div className="collapse" id="collapseCreditCard">
                      <div className="py-2">
                        <form action="#">
                          <div className="form-group">
                            <label
                              htmlFor="creditCardNo"
                              className="text-black"
                            >
                              {t("Card Number")}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="creditCardNo"
                              name="creditCardNo"
                              placeholder={t("Enter Card Number")}
                              onChange={() => setPaymentMethod(2)}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="cvv" className="text-black">
                              {t("CVV")}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cvv"
                              name="cvv"
                              placeholder={t("Enter CVV")}
                              maxLength={4}
                              onChange={() => setPaymentMethod(2)}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="form-group d-flex">
                    <button
                      className="btn btn-black btn-lg py-3 btn-block"
                      onClick={handleSendOTP}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <>{t("Place Order")}</>
                      )}
                    </button>
                    <a
                      href="/cart"
                      className="btn btn-primary btn-lg py-3 mx-2"
                    >
                      {t("Back To Cart")}
                    </a>
                  </div>
                  {openForm && (
                    <div className="border p-3 mb-3 mt-3">
                      <h3 className="h6 mb-0">{t("Enter OTP")}:</h3>
                      <p>{t("an OTP with 6 digit-number was sent to your email, please use it to verify in the form below before ordering")}</p>
                      <div>
                        <div className="py-2">
                          <input
                            type="text"
                            className="form-control"
                            name="otp"
                            id="otp"
                            value={otp}
                            placeholder={t("Enter OTP here...")}
                            maxLength={6}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                          <div className="d-flex">
                            <button
                              className="btn btn-danger mt-2 col-4"
                              onClick={handlePlaceOrder}
                            >
                              {t("Submit")}
                            </button>
                            <div className="col-4"></div>
                            <a href="#" onClick={handleSendOTP} className="mt-3 col-4">
                              {t("Send another OTP")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
