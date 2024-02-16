import React from "react";
import { useData } from "../../Context/DataContext";

const CardEarning5 = () => {
  const { allOrderList, loading, error } = useData();
  //lọc ra những đơn hủy
  const cancelOrder = allOrderList.filter((order) => order.orderStatus === 4);
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-warning shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                Orders Cancelled
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {cancelOrder.length}
              </div>
            </div>
            <div className="col-auto">
                {/* <i className="fas fa-comments fa-2x text-gray-300"></i> */}
                <i className="fas fa-ban fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEarning5;
