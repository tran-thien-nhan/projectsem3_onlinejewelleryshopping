import React from "react";

const CardHeaderDropdown1 = () => {
  return (
    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
      <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
      <div className="dropdown no-arrow">
        <a
          className="dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
        </a>
        <div
          className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
          aria-labelledby="dropdownMenuLink"
        >
          <div className="dropdown-header">Dropdown Header:</div>
          <a className="dropdown-item" href="#">
            Action
          </a>
          <a className="dropdown-item" href="#">
            Another action
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardHeaderDropdown1;
