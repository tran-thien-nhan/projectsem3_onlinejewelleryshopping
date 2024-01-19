import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemProvider } from "./Context/ItemContext";
import ItemDetail from "./components/User/ItemDetail";
import ItemList from "./components/User/ItemList";

function App() {
  return (
    <div className="">
      <ItemProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/item/:styleCode" element={<ItemDetail />} />
          </Routes>
        </Router>
      </ItemProvider>
    </div>
  );
}

export default App;
