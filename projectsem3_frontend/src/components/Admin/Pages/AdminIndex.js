import React from "react";
import PageHeading from "../PageHeading";
import CardEarning from "../CardEarning";
import CardEarning1 from "../CardEarning1";
import { CardBody } from "react-bootstrap";
import CardHeaderDropdown from "../CardHeaderDropdown";

const AdminIndex = () => {
  return (
    <div className="container-fluid">
      <PageHeading />

      <div className="row">
        <CardEarning />
        {/* <CardEarning1 /> */}
      </div>

      <div className="row">
        <div className="container">
          <div className="card shadow mb-4">
            <CardHeaderDropdown />
            <CardBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
