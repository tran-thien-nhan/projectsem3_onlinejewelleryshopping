import React from "react";
import "../../../asset/css/userstyle.css";
import "../../../asset/css/tiny-slider.css";
import { Container, Image } from "react-bootstrap";

const HeroSection = () => {
  return (
    <Container fluid className="hero-section my-4 container-fluid">
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="2"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://cdn.pnj.io/images/promo/174/BST_Sun_Lover_-_Style_1200x450-CTA.png"
              alt="Los Angeles"
              className="d-block"
              style={{ width: "100%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.pnj.io/images/promo/201/style-than-tai-retail-2024-1200x450_CTA.jpg"
              alt="Chicago"
              className="d-block"
              style={{ width: "100%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.pnj.io/images/promo/167/BANNER-style_1200x450.jpg"
              alt="New York"
              className="d-block"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </Container>
  );
};

export default HeroSection;
