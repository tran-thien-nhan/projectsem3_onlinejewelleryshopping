import React from "react";
import "../../../asset/css/userstyle.css";
import "../../../asset/css/tiny-slider.css";
import { Container, Image } from "react-bootstrap";

const HeroSection = () => {
  return (
    <Container fluid className="hero-section my-4 container-fluid">
      <Image
        src="https://i.pinimg.com/originals/57/eb/20/57eb20540a4abc438f631b36f0ad2d7b.jpg"
        alt="Banner Image"
        fluid
      />
    </Container>
  );
};

export default HeroSection;
