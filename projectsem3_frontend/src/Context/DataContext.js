import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [allOrderList, setAllOrderList] = useState([]); 
  const [isLogin, setIsLogin] = useState(false);
  const [userID, setUserID] = useState("");
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7241/api/ItemMst");
        console.log(response.data.data);
        setItems(response.data.data);
      } catch (error) {
        console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    var userId = sessionStorage.getItem("userID");
    setUserID(userId);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/Order/getorderbyuserid/${userId}`
        );
        setOrderList(response.data.data);
      } catch (error) {
        console.error("list error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const orderListSort = orderList.sort((a, b) => {
    return new Date(b.orderDate) - new Date(a.orderDate);
  });

  const orderListByUserId = orderList.filter((order) => {
    return order.userID === userID;
  });

  useEffect(() => {
    var userId = sessionStorage.getItem("userID");
    setUserID(userId);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/Cart/getcartbyuserid/${userId}`
        );
        setCartList(response.data.data);
      } catch (error) {
        console.error("list error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7241/api/Order/getall`
        );
        console.log(response.data.data);
        setAllOrderList(response.data.data);
      } catch (error) {
        console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = {
    items,
    loading,
    error,
    orderList,
    isLogin,
    userID,
    cartList,
    orderListSort,
    orderListByUserId,
    allOrderList,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  return context;
};
