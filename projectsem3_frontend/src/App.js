import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import ItemDetail from "./components/User/ItemDetail";
import ItemList from "./components/User/ItemList";
import UserNavbar from "./components/User/Layout/UserNavbar";
import Test from "./components/User/Test";
import UserFooter from "./components/User/Layout/UserFooter";
import Login from "./components/User/Login/Login";
import Register from "./components/User/Login/Register";
import Page404 from "./Pages/Page404";
import CartList from "./components/User/Cart/CartList";
import UserInfo from "./components/User/UserInfo";

function App() {
  return (
    <div className="">
      <DataProvider>
        <Router>
          <UserNavbar />
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/item/:styleCode" element={<ItemDetail />} />
            <Route path="/hello" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartList />} />
            <Route path="/info" element={<UserInfo />} />
            {/* <Route path="/cart/:styleCode" element={<CartList />} /> */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
        <UserFooter />
      </DataProvider>
    </div>
  );
}

export default App;
