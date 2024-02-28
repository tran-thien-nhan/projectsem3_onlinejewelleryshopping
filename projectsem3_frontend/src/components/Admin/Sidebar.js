import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateRouter } from "../../configs/routerList";
import { useData } from "../../Context/DataContext";

const Sidebar = (props) => {
  const { allOrderList, loading, error } = useData();
  const [newOrderCount, setNewOrderCount] = useState(0);
  const { style, onItemClick } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newOrders = allOrderList.filter(
      (order) =>
        new Date(order.orderDate).toDateString() ===
          new Date().toDateString() && order.orderStatus === 1
    );

    setNewOrderCount(newOrders.length);
  }, [allOrderList]); 

  const handleItemClick = (index, path, event) => {
    event.preventDefault();
    setSelectedItem(index);
    navigate(path);
    if (onItemClick) {
      onItemClick(index);
    }
  };

  return (
    <div>
      <ul className={props.style} id="accordionSidebar">
        {privateRouter.map(
          (route, index) =>
            route.visible && (
              <li
                className={`sidebartext ${
                  selectedItem === index ? "bold active" : ""
                }`}
                key={index}
              >
                <a
                  className="nav-link"
                  href={route.path}
                  onClick={(event) => handleItemClick(index, route.path, event)}
                  style={
                    selectedItem === index
                      ? { color: "yellow", fontWeight: "bold" }
                      : {}
                  }
                >
                  <div className="d-flex align-items-center">
                    <div className="col-auto">{route.icon}</div>
                    <div className="col-auto">{route.name}</div>
                    <div className="col-auto">
                      {route.name === "Orders " && (
                        <span
                          className={`mx-2 badge ${
                            newOrderCount > 0 ? "bg-danger" : ""
                          }`}
                        >
                          {newOrderCount > 0 ? newOrderCount : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
