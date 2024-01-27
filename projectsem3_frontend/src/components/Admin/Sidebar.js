import React from "react";
import { privateRouter } from "../../configs/routerList";

const Sidebar = (props) => {
  const { style, onItemClick } = props;
  return (
    <div>
      <ul className={props.style} id="accordionSidebar">
        <li className="sidebartext">
          <a className="nav-link" href="/admin">
            <span>Dashboard</span>
          </a>
        </li>
        <li className="sidebartext">
          <a className="nav-link" href="/items">
            <span>List Items</span>
          </a>
        </li>
        <li className="sidebartext">
          <a className="nav-link" href="/allorders">
            <span>List Orders</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
