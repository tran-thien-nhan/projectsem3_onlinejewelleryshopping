import React, { useEffect, useState } from "react";
import "../../../asset/css/userstyle.css";
import HeroSection from "../Layout/HeroSection";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CartList = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [cartList, setCartList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const { t, i18n } = useTranslation();

  const checkCartQuantity = () => {
    const exceedItems = cartList.filter((item) => item.quantity > 10 || item.quantity < 1);
    return exceedItems.length > 0;
  };

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

  const handleRemoveFromCart = async (id, e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `https://localhost:7241/api/Cart/${id}`
      );

      if (response.status === 200) {
        const updatedCartList = cartList.filter((item) => item.id !== id);
        setCartList(updatedCartList);
        Swal.fire(t("Success"), t("Remove cart successfully"), "success");

        setTimeout(() => {
          Swal.close();
        }, 1000);
      } else {
        Swal.fire(t("Error"), t("Remove cart fail"), "error");
        setTimeout(() => {
          Swal.close();
        }, 1000);
      }
    } catch (error) {
      console.error("Xóa giỏ hàng lỗi:", error);
    }
  };

  const handleClearCart = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://localhost:7241/api/Cart/clearcart/${userID}`);
      setCartList([]);
      Swal.fire(t("Success"), t("Clear cart successfully"), "success");
      setTimeout(() => {
        Swal.close();
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("clear cart error:", error);
      Swal.fire(t("Error"), t("Clear cart fail"), "error");
      setTimeout(() => {
        Swal.close();
      }, 1000);
    }
  };

  const handleDecrease = async (index, e) => {
    e.preventDefault();
    const updatedCartList = [...cartList];
    if (updatedCartList[index].quantity > 1) {
      updatedCartList[index].quantity--;
      updatedCartList[index].total =
        updatedCartList[index].itemMst.mrp * updatedCartList[index].quantity;
      setCartList(updatedCartList);

      try {
        await axios.put(
          `https://localhost:7241/api/Cart/updatequantity/${updatedCartList[index].id}/${updatedCartList[index].quantity}`
        );
      } catch (error) {
        console.error("Update quantity error:", error);
      }
    }
  };

  const handleIncrease = async (index, e) => {
    e.preventDefault();
    const updatedCartList = [...cartList];
    if (updatedCartList[index].quantity < 10) {
      updatedCartList[index].quantity++;
      updatedCartList[index].total =
        updatedCartList[index].itemMst.mrp * updatedCartList[index].quantity;
      setCartList(updatedCartList);

      try {
        await axios.put(
          `https://localhost:7241/api/Cart/updatequantity/${updatedCartList[index].id}/${updatedCartList[index].quantity}`
        );
      } catch (error) {
        console.error("Update quantity error:", error);
      }
    } else {
      console.log("Quantity cannot exceed 10");
      Swal.fire(t("Error"), t("Quantity cannot exceed 10"), "error");
    }
  };

  useEffect(() => {
    let total = 0;
    cartList.forEach((item) => {
      total += item.itemMst.mrp * item.quantity;
    });
    setSubTotal(total);
  }, [cartList]);

  return (
    <div>
      <HeroSection />
      {isLogin ? (
        <div className="untree_co-section before-footer-section">
          <div className="container">
            <div className="row mb-5">
              <form className="col-md-12" method="post">
                <div className="site-blocks-table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">{t("Image")}</th>
                        <th className="product-name">{t("Product")}</th>
                        <th className="product-price">{t("Price")}</th>
                        <th className="product-quantity">{t("Quantity")}</th>
                        <th className="product-total">{t("Total")}</th>
                        <th className="product-remove">{t("Remove")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartList.map((item, index) => (
                        <tr key={index}>
                          <td className="product-thumbnail">
                            <img
                              src={
                                item.itemMst.imagePath ||
                                "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
                              }
                              alt="Image"
                              className="img-fluid"
                            />
                          </td>
                          <td className="product-name">
                            <h2 className="h5 text-black">
                              {item.itemMst.product_Name}
                            </h2>
                          </td>
                          <td>${item.itemMst.mrp}</td>
                          <td>
                            <div
                              className="input-group mb-3 d-flex align-items-center quantity-container"
                              style={{ maxWidth: `120px` }}
                            >
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-black decrease"
                                  type="button"
                                  onClick={(e) => handleDecrease(index, e)}
                                >
                                  -
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control text-center quantity-amount"
                                value={item.quantity}
                                placeholder=""
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-black increase"
                                  type="button"
                                  onClick={(e) => handleIncrease(index, e)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>${(item.itemMst.mrp * item.quantity).toFixed(2)}</td>
                          <td>
                            <button
                              className="btn btn-black btn-sm"
                              onClick={(e) => handleRemoveFromCart(item.id, e)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <button
                      className="btn btn-black btn-sm btn-block"
                      onClick={(e) => handleClearCart(e)}
                    >
                      {t("Clear Cart")}
                    </button>
                  </div>
                  <div className="col-md-6">
                    <a
                      href="/"
                      className="btn btn-outline-black btn-sm btn-block"
                    >
                      {t("Continue Shopping")}
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-5">
                <div className="row justify-content-end">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase">
                          {t("Cart Totals")}
                        </h3>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span className="text-black">{t("Subtotal")}</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">${subTotal.toFixed(2)}</strong>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <span className="text-black">{t("Total")}</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">${subTotal.toFixed(2)}</strong>
                      </div>
                    </div>

                    <div className="row">
                      {checkCartQuantity() ? (
                        <div className="alert alert-warning" role="alert">
                          {t("Warning: There is 1 or more item with a quantity exceeding 10 or less than 1")}
                        </div>
                      ) : (
                        <a
                          className="btn btn-black btn-lg py-3 btn-block"
                          href="/checkout"
                        >
                          {t("Proceed To Checkout")}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default CartList;
