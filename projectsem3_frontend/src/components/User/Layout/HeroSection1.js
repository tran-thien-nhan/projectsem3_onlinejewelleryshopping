import React from "react";
import { Container } from "react-bootstrap";

const HeroSection1 = () => {
  return (
    <Container fluid className="hero-section my-4 container-fluid">
      <div className="row">
        <div className="col-md-4">
          <img
            src="https://cdn.pnj.io/images/promo/199/kimlong-CTA_494x247.png"
            alt="Hình ảnh 1"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-4">
          <img
            src="https://cdn.pnj.io/images/promo/201/game-than-tai-2024-494x247CTA.jpg"
            alt="Hình ảnh 2"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-4">
          <img
            src="https://cdn.pnj.io/images/promo/199/BST_Lucky_Mickey_KV_494x247CTA.png"
            alt="Hình ảnh 3"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default HeroSection1;
