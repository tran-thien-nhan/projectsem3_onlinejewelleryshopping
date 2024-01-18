import React from "react";

const CardBody1 = () => {
  return (
    <div className="card-body">
      <div className="chart-pie pt-4 pb-2">
        <canvas id="myPieChart"></canvas>
      </div>
      <div className="mt-4 text-center small">
        <span className="mr-2">
          <i className="fas fa-circle text-primary"></i> Direct
        </span>
        <span className="mr-2">
          <i className="fas fa-circle text-success"></i> Social
        </span>
        <span className="mr-2">
          <i className="fas fa-circle text-info"></i> Referral
        </span>
      </div>
    </div>
  );
};

export default CardBody1;
