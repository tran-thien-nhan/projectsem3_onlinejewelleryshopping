import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopbarNavbar from "./TopbarNavbar";
import Footer from "./Footer";
import AdminIndex from "./Pages/AdminIndex";

const AdminDashboard = () => {
  const [style, setStyle] = useState(
    "navbar-nav sidebar sidebar-dark accordion"
  );

  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <div className="mx-4">
                  <TopbarNavbar />
                </div>
              </nav>
              <div className="container-fluid d-flex">
                <div style={{ backgroundColor: "#3b5d50" }}>
                  <Sidebar style={style} />
                </div>
                <div className="container-fluid">
                  {/* <AdminIndex /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </div>
  );
};

export default AdminDashboard;
