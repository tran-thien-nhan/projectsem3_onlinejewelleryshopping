import React from "react";
import { useData } from "../../Context/DataContext";

const CardEarning1 = () => {
  const { allOrderList, loading, error } = useData();
  //lọc ra những order đã hoàn thành (orderstatus = 3)
  const completedOrder = allOrderList.filter(
    (order) => order.orderStatus === 3
  );

  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-success shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                Orders Completed
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {completedOrder.length}
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-check-circle fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEarning1;
