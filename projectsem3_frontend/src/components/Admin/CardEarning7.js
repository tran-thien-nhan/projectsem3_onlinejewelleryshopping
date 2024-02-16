import React from "react";
import { useData } from "../../Context/DataContext";

const CardEarning7 = () => {
  const { allOrderList, loading, error } = useData();
  //tính tổng tiền của những đơn hàng có hình thức thanh toán bằng tiền mặt (orderPayment = 1)
  const total = allOrderList
    .filter((order) => order.orderPayment === 1 && order.orderStatus === 3)
    .reduce((total, order) => total + order.totalPrice, 0);
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-warning shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                Orders By Cash
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(total)}
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-money-bill-wave fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEarning7;
