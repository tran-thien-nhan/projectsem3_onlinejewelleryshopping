import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import "../../asset/css/expanded-image.css";

function ItemDetail() {
  const { styleCode } = useParams();
  const { items, loading, error } = useData();
  const [quantity, setQuantity] = useState(1);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);

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

  const handleBuy = () => {
    // Add your buy logic here
    console.log("Buy button clicked");
    alert("Buy successfully");
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
        <p className="mb-2">Pairs: {selectedItem.pairs}</p>
        <p className="mb-2">Quality: {selectedItem.prod_Quality}</p>
        <p className="mb-2">Price: ${selectedItem.mrp}</p>
        <div className="d-flex flex-column">
          <div className="mb-2">
            <label htmlFor="quantity">Quantity:</label>
            <div className="d-flex">
              <button className="btn btn-dark" onClick={handleDecreaseQuantity}>
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                style={{ width: "50px" }}
                className="form-control mx-2"
              />
              <button
                className="btn btn-dark"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button className="btn btn-secondary col-12 mb-2" onClick={handleBuy}>
            Add To Cart
          </button>
          <button className="btn btn-warning col-12" onClick={handleBuy}>
            Buy It Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
