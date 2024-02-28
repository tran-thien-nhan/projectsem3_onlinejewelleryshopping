import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import UserNavbar from "./components/User/Layout/UserNavbar";
import UserFooter from "./components/User/Layout/UserFooter";
import { privateRouter, publicRouter } from "./configs/routerList";
import Footer from "./components/Admin/Footer";
import Sidebar from "./components/Admin/Sidebar";
import TopbarNavbar from "./components/Admin/TopbarNavbar";

function App() {
  const [style, setStyle] = useState(
    "navbar-nav sidebar sidebar-dark accordion"
  );
  const role = sessionStorage.getItem("role");

  return (
    <div className="">
      <DataProvider>
        <Router>
          {role === "admin" ? (
            <div>
              <>
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
                            <div
                              className="py-3 mb-3"
                              style={{
                                backgroundColor: "#3b5d50",
                                borderRadius: "10px",
                              }}
                            >
                              <Sidebar style={style} />
                            </div>
                            <div className="container-fluid">
                              <Routes>
                                {privateRouter.map((route, index) => (
                                  <Route
                                    key={index}
                                    path={route.path}
                                    element={route.element}
                                  />
                                ))}
                              </Routes>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Footer />
                  </body>
                </div>
              </>
            </div>
          ) : (
            <>
              <UserNavbar />
              <Routes>
                {publicRouter.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
              <UserFooter />
            </>
          )}
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
