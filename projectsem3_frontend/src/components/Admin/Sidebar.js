import React from "react";
import { privateRouter } from "../../configs/routerList";

const Sidebar = (props) => {
  const { style, onItemClick } = props;
  return (
    <div>
      <ul className={props.style} id="accordionSidebar">
        <h5
          className="sidebarbrand d-flex text-white mt-3 mx-3"
          style={{ fontWeight: "bold" }}
        >
          <a
            href="/allorders"
            className="text-white"
            style={{ textDecoration: "none" }}
          >
            <span className="mx-2">
              <i className="fas fa-user-cog mx-2"></i> 
              Admin
            </span>
          </a>
        </h5>
        <hr
          className="sidebar-divider my-0"
          style={{ height: "2px", backgroundColor: "white" }}
        />
        {privateRouter.map(
          (route, index) =>
            route.visible && (
              <li className="sidebartext" key={index}>
                <a className="nav-link" href={route.path}>
                  <span>{route.name}</span>
                </a>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
