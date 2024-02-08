import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import "../../asset/css/expanded-image.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function ItemDetail() {
  const navigate = useNavigate();
  const { styleCode } = useParams();
  const { items, loading, error } = useData();
  const [quantity, setQuantity] = useState(1);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const { t, i18n } = useTranslation();

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p className="alert alert-danger">Có lỗi xảy ra: {error.message}</p>;
  }

  const selectedItem = items.find((item) => item.style_Code === styleCode);

  if (!selectedItem) {
    return <p>Không tìm thấy item.</p>;
  }

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
        Swal.fire(t("Success"), t("Item added to cart successfully"), "success");

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
        Swal.fire(t("Success"), t("Item added to cart successfully"), "success");

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

  return (
    <div className="container row my-4 mx-2">
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
      <div className="col-md-6">
        <h2>{selectedItem.product_Name}</h2>
        <p className="mb-2">{t("Pairs")}: {selectedItem.pairs}</p>
        <p className="mb-2">{t("Quality")}: {t(selectedItem.prod_Quality)}</p>
        <p className="mb-2">{t("Price")}: ${selectedItem.mrp}</p>

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
                    }
                    else{
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
      </div>
    </div>
  );
}

export default ItemDetail;
