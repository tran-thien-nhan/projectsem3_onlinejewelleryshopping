import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useData } from "../../Context/DataContext";

const TopbarNavbar = () => {
  const { allOrderList, loading, error } = useData();
  const navigate = useNavigate();

  //lấy những đơn hàng của ngày hôm nay và có orderStatus == 1
  const newOrder = allOrderList.filter(
    (order) =>
      new Date(order.orderDate).toDateString() === new Date().toDateString() &&
      order.orderStatus === 1
  );

  const oldOrder = allOrderList.filter(
    (order) =>
      new Date(order.orderDate).toDateString() !== new Date().toDateString() &&
      (order.orderStatus === 1 || order.orderStatus === 2)
  );

  const handleLogout = async () => {
    try {
      const username = sessionStorage.getItem("userName");
      const response = await axios.get(
        `https://localhost:7241/api/Admin/updateadminstatus/${username}`
      );
      if (response.status === 200) {
        sessionStorage.clear();
        Swal.fire("Success", "Logout successful!", "success");
        setTimeout(() => {
          Swal.close();
          navigate("/movingtouser");
        }, 2000);
      } else {
        Swal.fire("Error", "Failed to logout", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "An error occurred", "error");
    }
  };

  useEffect(() => {
    // Thiết lập hẹn giờ cho việc logout sau 15 phút không thao tác
    let timeout = setTimeout(() => {
      handleLogout(); // Gọi hàm handleLogout khi hết thời gian
    }, 15 * 60 * 1000); // 15 phút * 60 giây/phút * 1000 miligiây/giây

    // Đặt sự kiện cho các hoạt động người dùng để làm mới hẹn giờ
    const resetTimeout = () => {
      clearTimeout(timeout); // Xóa hẹn giờ hiện tại
      // Thiết lập lại hẹn giờ mới
      timeout = setTimeout(() => {
        handleLogout();
      }, 15 * 60 * 1000);
    };

    // Đặt sự kiện cho các hoạt động người dùng để làm mới hẹn giờ
    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("mousedown", resetTimeout);
    document.addEventListener("keypress", resetTimeout);
    document.addEventListener("touchmove", resetTimeout);

    // Xóa các sự kiện khi component unmount
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("mousedown", resetTimeout);
      document.removeEventListener("keypress", resetTimeout);
      document.removeEventListener("touchmove", resetTimeout);
    };
  }, []);

  return (
    <ul className="navbar-nav ml-auto">
      {/* <div className="topbar-divider d-none d-sm-block"></div> */}
      <li className="nav-item dropdown no-arrow">
        <button
          type="button"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          style={{ fontWeight: "bold" }}
        >
          Hello {sessionStorage.getItem("userName")}
        </button>
        <div
          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <button className="dropdown-item text-white" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Log Out
          </button>
        </div>
      </li>
      <li className="nav-item">
        <a
          type="button"
          className="nav-link"
          style={{ fontWeight: "bold", fontSize: "1rem" }}
          href="/allorders"
        >
          <span
            className={`badge ${
              newOrder.length > 0 ? "bg-danger" : "bg-success"
            }`}
          >
            {newOrder.length} New Orders
          </span>
        </a>
      </li>
      <li className="nav-item">
        <a
          type="button"
          className="nav-link"
          style={{ fontWeight: "bold", fontSize: "1rem" }}
          href="/allorders"
        >
          <span
            className={`badge ${
              oldOrder.length > 0 ? "bg-secondary" : "bg-success"
            }`}
          >
            {oldOrder.length} Unprocessing Orders
          </span>
        </a>
      </li>
    </ul>
  );
};

export default TopbarNavbar;
