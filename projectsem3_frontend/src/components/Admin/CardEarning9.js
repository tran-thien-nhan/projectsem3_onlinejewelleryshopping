import React from "react";
import { useData } from "../../Context/DataContext";

const CardEarning9 = () => {
  const { items, loading, error } = useData();
  //đếm số lượng items
  const total = items.length;
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-warning shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                Number Of Products
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {total}
              </div>
            </div>
            <div className="col-auto">
                <i className="fas fa-boxes fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEarning9;
