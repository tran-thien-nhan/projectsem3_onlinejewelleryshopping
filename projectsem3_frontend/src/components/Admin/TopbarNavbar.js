import React from "react";
import { useNavigate } from "react-router-dom";

const TopbarNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();    
    navigate("/movingtouser");
  };

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
    </ul>
  );
};

export default TopbarNavbar;
