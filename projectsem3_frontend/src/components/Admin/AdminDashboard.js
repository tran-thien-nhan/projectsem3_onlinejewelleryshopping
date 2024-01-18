import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopbarSearch from "./TopbarSearch";
import TopbarNavbar from "./TopbarNavbar";
import PageHeading from "./PageHeading";
import CardEarning from "./CardEarning";

const AdminDashboard = () => {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  return (
    <div id="page-top">
      {/*  <!-- Page Wrapper --> */}
      <div id="wrapper">
        {/*  <!-- Sidebar --> */}
        <Sidebar style={style} changeStyle={changeStyle} />
        {/*  <!-- End of Sidebar --> */}

        {/*  <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/*  <!-- Main Content --> */}
          <div id="content">
            {/*  <!-- Topbar --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/*  <!-- Sidebar Toggle (Topbar) --> */}
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
                onClick={changeStyle1}
              >
                <i className="fa fa-bars"></i>
              </button>
              {/*  <!-- Topbar Search --> */}
              <TopbarSearch />
              <TopbarNavbar />
            </nav>
            {/*  <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              {/*  <!-- Page Heading --> */}
              <PageHeading />
              
                {/*  <!-- Content Row --> */}
                <div className="row">
                     {/*  <!-- Earnings (Monthly) Card Example --> */}
                     <CardEarning />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
