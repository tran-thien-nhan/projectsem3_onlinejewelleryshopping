import React from "react";
import { privateRouter } from "../../configs/routerList";

const Sidebar = (props) => {
  const { style, onItemClick } = props;
  return (
    <div>
      <ul className={props.style} id="accordionSidebar">
        {
          privateRouter.map((route, index) => (
            route.visible && (
              <li className="sidebartext" key={index}>
                <a
                  className="nav-link"
                  href={route.path}
                >
                  <span>{route.name}</span>
                </a>
              </li>
            )
          ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;
