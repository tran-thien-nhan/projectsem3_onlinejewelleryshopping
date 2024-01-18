import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopbarSearch from "./TopbarSearch";
import TopbarNavbar from "./TopbarNavbar";
import PageHeading from "./PageHeading";
import CardEarning from "./CardEarning";
import CardEarning1 from "./CardEarning1";
import CardEarning2 from "./CardEarning2";
import CardEarning3 from "./CardEarning3";
import CardHeaderDropdown from "./CardHeaderDropdown";
import CardBody from "./CardBody";
import CardHeaderDropdown1 from "./CardHeaderDropdown1";
import CardBody1 from "./CardBody1";
import CardProjectExample from "./CardProjectExample";
import ColorSystem from "./ColorSystem";
import Illustrations from "./Illustrations";
import Approach from "./Approach";
import Footer from "./Footer";
import ScrollToButton from "./ScrollToButton";
import LogoutModal from "./LogoutModal";
import '../../asset/css/Dashboard.css';
import '../../asset/css/sb-admin-2.css';
import '../../asset/css/sb-admin-2.min.css';

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
    <div>
      <body id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/*  <!-- Sidebar --> */}
          <Sidebar style={style} changeStyle={changeStyle}></Sidebar>
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
                <TopbarSearch></TopbarSearch>

                {/*  <!-- Topbar Navbar --> */}
                <TopbarNavbar></TopbarNavbar>
              </nav>
              {/*  <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">
                {/*  <!-- Page Heading --> */}
                <PageHeading></PageHeading>

                {/*  <!-- Content Row --> */}
                <div className="row">
                  {/*  <!-- Earnings (Monthly) Card Example --> */}
                  <CardEarning />

                  {/*  <!-- Earnings (Monthly) Card Example --> */}
                  <CardEarning1></CardEarning1>

                  {/*  <!-- Earnings (Monthly) Card Example --> */}
                  <CardEarning2></CardEarning2>

                  {/*  <!-- Pending Requests Card Example --> */}
                  <CardEarning3></CardEarning3>
                </div>

                {/*  <!-- Content Row --> */}

                <div className="row">
                  {/*   <!-- Area Chart --> */}
                  <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                      {/*  <!-- Card Header - Dropdown --> */}
                      <CardHeaderDropdown></CardHeaderDropdown>
                      {/*  <!-- Card Body --> */}
                      <CardBody></CardBody>
                    </div>
                  </div>

                  {/*  <!-- Pie Chart --> */}
                  <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                      {/*  <!-- Card Header - Dropdown --> */}
                      <CardHeaderDropdown1></CardHeaderDropdown1>
                      {/*  <!-- Card Body --> */}
                      <CardBody1></CardBody1>
                    </div>
                  </div>
                </div>

                {/*   <!-- Content Row --> */}
                <div className="row">
                  {/*   <!-- Content Column --> */}
                  <div className="col-lg-6 mb-4">
                    {/* <!-- Project Card Example --> */}
                    <CardProjectExample></CardProjectExample>
                    {/* <!-- Color System --> */}
                    <ColorSystem></ColorSystem>
                  </div>

                  <div className="col-lg-6 mb-4">
                    {/* <!-- Illustrations --> */}
                    <Illustrations></Illustrations>

                    {/* <!-- Approach --> */}
                    <Approach></Approach>
                  </div>
                </div>
              </div>
              {/*   <!-- /.container-fluid --> */}
            </div>
            {/*   <!-- End of Main Content -->

                                        <!-- Footer --> */}
            <Footer></Footer>
            {/* <!-- End of Footer --> */}
          </div>
          {/*  <!-- End of Content Wrapper --> */}
        </div>
        {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
        <ScrollToButton></ScrollToButton>

        {/*  <!-- Logout Modal--> */}
        <LogoutModal></LogoutModal>
      </body>
    </div>
  );
};

export default AdminDashboard;
