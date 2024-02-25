import React from "react";
import PageHeading from "../PageHeading";
import CardEarning from "../CardEarning";
import CardEarning1 from "../CardEarning1";
import { CardBody } from "react-bootstrap";
import CardHeaderDropdown from "../CardHeaderDropdown";
import OrderBarchart from "./OrderBarchart";
import CardEarning6 from "../CardEarning6";
import CardEarning7 from "../CardEarning7";
import CardEarning2 from "../CardEarning2";
import CardEarning10 from "../CardEarning10";
import CardEarning3 from "../CardEarning3";
import CardEarning4 from "../CardEarning4";
import CardEarning5 from "../CardEarning5";
import CardEarning8 from "../CardEarning8";
import CardEarning11 from "../CardEarning11";
import CardEarning9 from "../CardEarning9";

const AdminIndex = () => {
  return (
    <div className="container-fluid">
      <PageHeading />

      <div className="row">
        <div className="d-flex flex-wrap">
          <CardEarning className="flex-fill" />
          <CardEarning6 className="flex-fill" />
          <CardEarning7 className="flex-fill" />
          <CardEarning2 className="flex-fill" />
        </div>
        <div className="d-flex flex-wrap">
          <CardEarning10 className="flex-fill" />
          <CardEarning3 className="flex-fill" />
          <CardEarning4 className="flex-fill" />
          <CardEarning1 className="flex-fill" />
        </div>
        <div className="d-flex flex-wrap">
          <CardEarning5 className="flex-fill" />
          <CardEarning8 className="flex-fill" />
          <CardEarning11 className="flex-fill" />
          <CardEarning9 className="flex-fill" />
        </div>
      </div>

      <div className="row">
        <div className="container">
          <div className="card shadow mb-4">
            <CardHeaderDropdown />
            <CardBody />
            <OrderBarchart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
