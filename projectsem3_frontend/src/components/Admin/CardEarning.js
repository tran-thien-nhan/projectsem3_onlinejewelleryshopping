import React from "react";
import { useData } from "../../Context/DataContext";

const CardEarning = () => {
  const { totalMoney, loading, error } = useData();
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
                {
                  loading ? (
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    error ? (
                      <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {totalMoney.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).replace(".00", "")}
                      </div>
                    )
                  )
                }
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEarning;
