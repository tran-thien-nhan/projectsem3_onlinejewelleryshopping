import React from "react";
import { useData } from "../../Context/DataContext";

const CardEarning = () => {
  const { allOrderList, loading, error } = useData();
  //tính tổng tiền của những đơn hàng đã giao thành công (orderstatus = 3)
  const total = allOrderList
    .filter((order) => order.orderStatus === 3)
    .reduce((total, order) => total + order.totalPrice, 0);

  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Revenue
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {total
                      .toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .replace(".00", "")}
                  </div>
                )}
              </div>
            </div>
            <div className="col-auto">
              {/* <i className="fas fa-calendar fa-2x text-gray-300"></i> */}
              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEarning;
