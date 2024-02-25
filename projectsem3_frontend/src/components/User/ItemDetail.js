import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import "../../asset/css/expanded-image.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function ItemDetail() {
  const navigate = useNavigate();
  const { styleCode } = useParams();
  const {
    items,
    brands,
    categories,
    certifies,
    prod,
    golds,
    jewelry,
    stoneQualities,
    loading,
    error,
    dim,
    dimQlty,
    dimQltySub,
    dimInfo,
    itemListWithDim,
    wistlist,
  } = useData();
  const [quantity, setQuantity] = useState(1);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [updatewistlist, setUpdateWistlist] = useState([]);
  const { t, i18n } = useTranslation();

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p className="alert alert-danger">Có lỗi xảy ra: {error.message}</p>;
  }

  const selectedDim = itemListWithDim.find(
    (item) => item.style_Code === styleCode
  );

  const wistlistByUserId = wistlist.filter(
    (wistlist) => wistlist.userID === sessionStorage.getItem("userID")
  );

  //console.log(wistlistByUserId);
  const isWishListExist = wistlistByUserId.some(
    (item) => item.style_Code === styleCode
  );
  console.log(isWishListExist);

  const selectedItem = items.find((item) => item.style_Code === styleCode);
  // sp liên quan
  const relatedItems = items
    .filter((item) => item.style_Code !== styleCode)
    .slice(0, 4);

  if (!selectedItem) {
    return <p>Không tìm thấy item.</p>;
  }

  const handleAddToWishlist = async (e) => {
    e.preventDefault();

    //kiểm tra đăng nhập
    if (!sessionStorage.getItem("userID")) {
      Swal.fire(t("Error"), t("Please login to add item to wishlist"), "error");
      return;
    }

    if (isWishListExist) {
      handleDeleteFromWishList(wistlistByUserId[0].whistList_ID, e);
      window.location.reload();
      return;
    }

    try {
      const response = await axios.post("https://localhost:7241/api/WishList", {
        WhistList_ID: selectedItem.style_Code,
        Style_Code: selectedItem.style_Code,
        UserID: sessionStorage.getItem("userID"),
      });

      if (response.status === 200) {
        Swal.fire(
          t("Success"),
          t("Item added to wishlist successfully"),
          "success"
        );

        setTimeout(() => {
          Swal.close();
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error);
        Swal.fire(
          "Error",
          `Failed to add item to wishlist. Server responded with ${error.response.status}`,
          "error"
        );
      }
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("ID", selectedItem.id);
      formData.append("userID", sessionStorage.getItem("userID"));
      formData.append("Style_Code", selectedItem.style_Code);
      formData.append("Quantity", quantity);
      formData.append("Product_Name", selectedItem.product_Name);
      formData.append("MRP", selectedItem.mrp);

      const response = await axios.post(
        "https://localhost:7241/api/Cart/addcart",
        formData
      );

      if (response.status === 200) {
        Swal.fire(
          t("Success"),
          t("Item added to cart successfully"),
          "success"
        );

        setTimeout(() => {
          Swal.close();
          navigate("/cart");
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
        Swal.fire(
          t("Error"),
          `Failed to add item to cart. Server responded with ${error.response.status}. ${error.response.data}`,
          "error"
        );

        if (error.response) {
          console.log(error.response.data);
          const errorMessage = error.response.data.errors.ID[0];
          Swal.fire(
            "Error",
            `Failed to add item to cart. ${errorMessage}`,
            "error"
          );
          console.log(errorMessage);
        } else if (error.request) {
          console.log(error.request);
          Swal.fire("Error", "Failed to connect to the server", "error");
        } else {
          console.log(error.message);
          Swal.fire("Error", "An unexpected error occurred", "error");
        }
      } else if (error.request) {
        console.log(error.request);
        Swal.fire("Error", "Failed to connect to the server", "error");
      } else {
        console.log(error.message);
        Swal.fire("Error", "An unexpected error occurred", "error");
      }
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity <= 9) {
      setQuantity(quantity + 1);
    }
  };

  const handleExpandImage = () => {
    setIsImageExpanded(!isImageExpanded);
    setIsOverlayActive(!isImageExpanded); // Toggle state for the overlay
  };

  const handleOverlayClick = () => {
    if (isOverlayActive) {
      // Reset state when clicking outside the image
      setIsImageExpanded(false);
      setIsOverlayActive(false);
    }
  };

  const buyButton = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("ID", selectedItem.id);
      formData.append("userID", sessionStorage.getItem("userID"));
      formData.append("Style_Code", selectedItem.style_Code);
      formData.append("Quantity", quantity);
      formData.append("Product_Name", selectedItem.product_Name);
      formData.append("MRP", selectedItem.mrp);

      const response = await axios.post(
        "https://localhost:7241/api/Cart/addcart",
        formData
      );

      if (response.status === 200) {
        Swal.fire(
          t("Success"),
          t("Item added to cart successfully"),
          "success"
        );

        setTimeout(() => {
          Swal.close();
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
        Swal.fire(
          "Error",
          `Failed to add item to cart. Server responded with ${error.response}`,
          "error"
        );

        if (error.response) {
          console.log(error.response.data);
          const errorMessage = error.response.data.errors.ID[0];
          Swal.fire(
            "Error",
            `Failed to add item to cart. ${errorMessage}`,
            "error"
          );
          console.log(errorMessage);
        } else if (error.request) {
          console.log(error.request);
          Swal.fire("Error", "Failed to connect to the server", "error");
        } else {
          console.log(error.message);
          Swal.fire("Error", "An unexpected error occurred", "error");
        }
      } else if (error.request) {
        console.log(error.request);
        Swal.fire("Error", "Failed to connect to the server", "error");
      } else {
        console.log(error.message);
        Swal.fire("Error", "An unexpected error occurred", "error");
      }
    }
  };

  const handleDeleteFromWishList = async (id, e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `https://localhost:7241/api/WishList/unaddfromwishlist/${id}`
      );
      if (response.status === 200) {
        const updatedWishList = wistlistByUserId.filter(
          (item) => item.id !== id
        );
        setUpdateWistlist(updatedWishList);
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong!",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid row my-4">
      <div className="col-md-6">
        <div
          className={`expanded-image-overlay ${
            isOverlayActive ? "active" : ""
          }`}
          onClick={handleOverlayClick}
          style={{ cursor: "pointer" }}
        ></div>
        <img
          src={
            selectedItem.imagePath ||
            "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
          }
          alt={selectedItem.product_Name}
          className={`img-fluid ${
            isImageExpanded ? "expanded-image active" : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={handleExpandImage}
        />
      </div>
      <div className="col-md-6 my-5">
        <h2>{selectedItem.product_Name}</h2>

        <form onSubmit={handleAddToCart}>
          <input type="hidden" name="id" value={selectedItem.id} />
          <input
            type="hidden"
            name="userID"
            value={sessionStorage.getItem("userID")}
          />
          <input
            type="hidden"
            name="styleCode"
            value={selectedItem.style_Code}
          />
          <input
            type="hidden"
            name="productName"
            value={selectedItem.product_Name}
          />
          <input type="hidden" name="mrp" value={selectedItem.mrp} />
          <h4 style={{ marginTop: "10px" }}>
            {t("Price")}:{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>
              ${selectedItem.mrp}
            </span>
          </h4>

          <div>
            {selectedItem.quantity > 10 && selectedItem.visible === true ? (
              <h5
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                ({t("In Stock")})
              </h5>
            ) : (
              <h5
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                ({t("Out of Stock")})
              </h5>
            )}
          </div>

          <div className="d-flex flex-column">
            <div className="mb-2">
              <label htmlFor="quantity">{t("Quantity")}:</label>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{ width: "60px" }}
                  className="form-control mx-2"
                />
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    if (quantity >= 10) {
                      setQuantity(10);
                      Swal.fire("Error", "Maximum quantity is 10", "error");
                    } else {
                      setQuantity(quantity + 1);
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-secondary col-12 mb-2"
              onClick={handleAddToCart}
            >
              {t("Add to Cart")}
            </button>
            <button
              className="btn btn-dark col-12"
              onClick={(e) => buyButton(e)}
            >
              {t("Buy It Now")}
            </button>
          </div>
        </form>
        <form onSubmit={handleAddToWishlist}>
          <div>
            <input type="hidden" name="WhistList_ID" value="abc" />
            <button
              style={{ backgroundColor: "white", color: "black" }}
              className="btn btn-default mt-2"
              onClick={handleAddToWishlist}
            >
              {isWishListExist ? (
                <i className="fa fa-heart" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-heart-o" aria-hidden="true"></i>
              )}
              <span className="mx-2">
                {isWishListExist ? t("Remove from Wishlist") : t("Favorite")}
              </span>
            </button>
          </div>
        </form>
      </div>

      <div
        className="accordion mt-4"
        style={{ cursor: "pointer" }}
        data-bs-toggle="collapse"
        data-bs-target="#demo1"
      >
        <div className="card">
          <div className="card-header">
            <h5 className="card-title text-center">
              <a
                href="#demo1"
                className="card-link"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="demo"
                style={{ textDecoration: "none" }}
              >
                {t("Introduction")}
              </a>
            </h5>
          </div>
          <div id="demo1" className="collapse">
            <div className="card-body">
              <p>
                {t("The product")} {selectedItem.product_Name}{" "}
                {selectedItem.stoneQltyMst.stoneQlty !== "None" && (
                  <>
                    {t("with one part of")} {t("making of")} {t("stones of")}{" "}
                    {selectedItem.stoneQltyMst.stoneQlty},{" "}
                    {t("the type of stone")} {t("found in the year")}{" "}
                    {selectedItem.stoneQltyMst.stone_Year}.{" "}
                  </>
                )}
                ,{t("The product")} {t("has")} {selectedItem.pairs} {t("Pairs")}{" "}
                {t("and is certified by")}{" "}
                {selectedItem.certifyMst.certify_Type}. {t("The product")}{" "}
                {t("belongs to the")} {t("type of")}{" "}
                {t(selectedItem.jewelTypeMst.jewellery_Type)} {t("and")}{" "}
                {t("has")} {t("quality")} {t(selectedItem.prod_Quality)}.{" "}
                {t("Additionally")}, {t("the product")} {t("has")}{" "}
                {t("the brand")} {selectedItem.brandMst.brand_Type} {t("and")}{" "}
                {""}
                {t("belongs to the")} {t("category")}{" "}
                {t(selectedItem.catMst.cat_Name)}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="accordion"
        style={{ cursor: "pointer" }}
        data-bs-toggle="collapse"
        data-bs-target="#demo2"
      >
        <div className="card">
          <div className="card-header">
            <h5 className="card-title text-center">
              <a
                href="#demo2"
                className="card-link"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="demo"
                style={{ textDecoration: "none" }}
              >
                {t("Information")}
              </a>
            </h5>
          </div>
          <div id="demo2" className="collapse">
            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <td>{t("Pairs")}</td>
                    <td>{selectedItem.pairs}</td>
                  </tr>
                  <tr>
                    <td>{t("Quality")}</td>
                    <td>{t(selectedItem.prod_Quality)}</td>
                  </tr>
                  <tr>
                    <td>{t("Product Type")}</td>
                    <td>{t(selectedItem.prodMst.prod_Type)}</td>
                  </tr>
                  <tr>
                    <td>{t("Brand")}</td>
                    <td>{selectedItem.brandMst.brand_Type}</td>
                  </tr>
                  <tr>
                    <td>{t("Certificate")}</td>
                    <td>{selectedItem.certifyMst.certify_Type}</td>
                  </tr>
                  <tr>
                    <td>{t("Jewelry Type")}</td>
                    <td>{t(selectedItem.jewelTypeMst.jewellery_Type)}</td>
                  </tr>
                  {selectedItem.stoneQltyMst.stoneQlty !== "None" && (
                    <tr>
                      <td>{t("Stone Quality")}</td>
                      <td>{t(selectedItem.stoneQltyMst.stoneQlty)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {
        //nếu có style_Code trùng với style_Code của dim thì hiển thị
        selectedDim !== undefined ? (
          <div
            className="accordion"
            style={{ cursor: "pointer" }}
            data-bs-toggle="collapse"
            data-bs-target="#demo3"
          >
            <div className="card">
              <div className="card-header">
                <h5 className="card-title text-center">
                  <a
                    href="#demo3"
                    className="card-link"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="demo"
                    style={{ textDecoration: "none" }}
                  >
                    {t("Diamond Information")}
                  </a>
                </h5>
              </div>
              <div id="demo3" className="collapse">
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>{t("Carat Of Diamond")}</td>
                        <td>{selectedDim.dimMsts.dim_Crt} Carat</td>
                      </tr>
                      <tr>
                        <td>{t("Total Pcs Of Diamond In Item")}</td>
                        <td>{t(selectedDim.dimMsts.dim_Pcs)}</td>
                      </tr>
                      <tr>
                        <td>{t("Weight Of Each Diamond (Grams)")}</td>
                        <td>{t(selectedDim.dimMsts.dim_Gm)}</td>
                      </tr>
                      <tr>
                        <td>{t("Size Of Each Diamond")}</td>
                        <td>{selectedDim.dimMsts.dim_Size}</td>
                      </tr>
                      <tr>
                        <td>{t("Rate Of Each Diamond")}</td>
                        <td>{selectedDim.dimMsts.dim_Rate}</td>
                      </tr>
                      <tr>
                        <td>{t("Total Amount Of All Diamonds In Item")}</td>
                        <td>{t(selectedDim.dimMsts.dim_Amt)}</td>
                      </tr>
                      <tr>
                        <td>{t("Quality Of Diamond")}</td>
                        <td>{t(selectedDim.dimMsts.dimQltyMst.dimQlty)}</td>
                      </tr>
                      <tr>
                        <td>{t("Sub Quality Of Diamond")}</td>
                        <td>{t(selectedDim.dimMsts.dimQltySubMst.dimQlty)}</td>
                      </tr>
                      <tr>
                        <td>{t("Type Of Diamond")}</td>
                        <td>{t(selectedDim.dimMsts.dimInfoMst.dimType)}</td>
                      </tr>
                      <tr>
                        <td>{t("Sub Type Of Diamond")}</td>
                        <td>{t(selectedDim.dimMsts.dimInfoMst.dimSubType)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      }

      <h3 className="mt-4">{t("Related Products")}:</h3>
      <div className="row">
        {relatedItems.map((item) => (
          <div className="col-md-3" key={item.id}>
            <div className="card custom-card" style={{ height: "100%" }}>
              <img
                src={item.imagePath}
                alt={item.product_Name}
                className="card-img-top img-fluid"
                style={{ objectFit: "cover", height: "300px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.product_Name}</h5>
                <p className="card-text">
                  {t("Price")}: ${item.mrp}
                </p>
                <a
                  className="btn btn-secondary"
                  href={`/item/${item.style_Code}`}
                >
                  {t("View Details")}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemDetail;
