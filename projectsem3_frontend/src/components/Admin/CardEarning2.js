import React from "react";
import { useData } from "../../Context/DataContext";

const CardEarning2 = () => {
  const { allOrderList, loading, error } = useData();
  //tổng tiền những đơn hoàn thành * 100 / 100.000
  const completedOrder = allOrderList.filter(
    (order) => order.orderStatus === 3
  );
  const totalEarning = completedOrder.reduce(
    (total, order) => total + order.totalPrice,
    0
  );
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-info shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                KPI Performance
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-auto">
                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                    {((totalEarning * 100) / 100000)
                      .toFixed(2)
                      .replace(".", ",")}
                    %
                  </div>
                </div>
                <div className="col">
                  <div className="progress progress-sm mr-2">
                    <div
                      className="progress-bar bg-info a1"
                      role="progressbar"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEarning2;
