import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemProvider } from "./Context/ItemContext";
import ItemDetail from "./components/User/ItemDetail";
import ItemList from "./components/User/ItemList";
import UserNavbar from "./components/User/Layout/UserNavbar";
import Test from "./components/User/Test";
import UserFooter from "./components/User/Layout/UserFooter";

function App() {
  return (
    <div className="">
      <ItemProvider>
        <UserNavbar />
        <Router>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/item/:styleCode" element={<ItemDetail />} />
            <Route path="/hello" element={<Test />} />
          </Routes>
        </Router>
        <UserFooter />
      </ItemProvider>
    </div>
  );
}

export default App;
