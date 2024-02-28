import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  //Nhan's state
  // const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [userList, setUserList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [allOrderList, setAllOrderList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [itemListWithDim, setItemListWithDim] = useState([]);
  const [wistlist, setWistlist] = useState([]);

  //Phi's state
  const [brands, setBrands] = useState([]);
  const [categories, setCategory] = useState([]);
  const [golds, setGold] = useState([]);
  const [stones, setStone] = useState([]);
  const [stoneQualities, setStoneQualities] = useState([]);
  const [certifies, setCertify] = useState([]);

  //Hung's state
  const [dimQlty, setDimQlty] = useState([]);
  const [dimQltySub, setDimQltySub] = useState([]);
  const [dim, setDim] = useState([]);
  const [prod, setProd] = useState([]);
  const [jewelry, setJewelry] = useState([]);
  const [dimInfo, setDimInfo] = useState([]);
  const [inquiry, setInquiry] = useState([]);

  //Minh's state

  //State Chung
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [userID, setUserID] = useState("");

  //Nhan's Fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7241/api/ItemMst");
        //console.log(response.data.data);
        setItems(response.data.data);
      } catch (error) {
        //console.error("list error:", error);
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
        //console.error("list error:", error);
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
        //console.log(response.data.data);
        setAllOrderList(response.data.data);
      } catch (error) {
        //console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7241/api/Order/gettotalmoney`
        );
        //console.log(response.data.data);
        setTotalMoney(response.data.data);
      } catch (error) {
        //console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7241/api/User/getalluser`
        );
        //console.log(response.data.data);
        setUserList(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7241/api/Admin`);
        //console.log(response.data.data);
        setAdminList(response.data.data);
      } catch (error) {
        //console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7241/api/ItemMst/getallitemwithdim`
        );
        //console.log(response.data.data);
        setItemListWithDim(response.data.data);
      } catch (error) {
        //console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7241/api/WishList/getallwishlist`
        );
        //console.log(response.data.data);
        setWistlist(response.data.data);
      } catch (error) {
        //console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //Phi's Fetch API
  //Get Brand
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7241/api/BrandMst`);
        //console.log(response.data.data);
        setBrands(response.data.data);
      } catch (error) {
        //console.error("List error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Get Category
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7241/api/CatMst");
        // console.log(response.data.data);
        setCategory(response.data.data);
      } catch (error) {
        //console.error("List Category error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Get Gold Krt Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:7241/api/GoldKrtMst"
        );
        //console.log(response.data.data);
        setGold(response.data.data);
      } catch (error) {
        //console.error("List Gold error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Get Stone Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7241/api/StoneMst");
        // console.log(response.data.data);
        setStone(response.data.data);
      } catch (error) {
        //console.error("List Stone error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Get Stone Quality Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:7241/api/StoneQltyMst"
        );
        //console.log(response.data.data);
        setStoneQualities(response.data.data);
      } catch (error) {
        //console.error("List Stone Quantity error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //Get Certify Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:7241/api/CertifyMst"
        );
        // console.log(response.data.data);
        setCertify(response.data.data);
      } catch (error) {
        //console.error("List Certify error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  ////Hung's Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7241/api/DimQltyMst`
        );
        ///console.log(response.data.data);
        setDimQlty(response.data.data);
      } catch (error) {
        console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //dim
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7241/api/DimMst`);
        //console.log(response.data.data);
        setDim(response.data.data);
      } catch (error) {
        console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //dimQltySub
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:7241/api/DimQltySubMst"
        );
        //console.log(response.data.data);
        setDimQltySub(response.data.data);
      } catch (error) {
        console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //prod
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7241/api/ProdMst`);
        //console.log(response.data.data);
        setProd(response.data.data);
      } catch (error) {
        console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //info
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7241/api/DimInfoMst`
        );
        //console.log(response.data.data);
        setDimInfo(response.data.data);
      } catch (error) {
        console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //jewel
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7241/api/JewelTypeMst`
        );
        //console.log(response.data.data);
        setJewelry(response.data.data);
      } catch (error) {
        console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //inquiry
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7241/api/Inquiry`);
        // console.log(response.data.data);
        setInquiry(response.data.data);
      } catch (error) {
        console.error("list error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Minh's Fetch Data

  const value = {
    //Nhan's value
    items,
    orderList,
    cartList,
    orderListSort,
    orderListByUserId,
    allOrderList,
    totalMoney,
    userList,
    adminList,
    itemListWithDim,
    wistlist,

    //Phi's Value
    brands,
    categories,
    golds,
    stones,
    certifies,
    stoneQualities,

    //Hung's Value
    dimQlty,
    dim,
    prod,
    dimQltySub,
    dimInfo,
    jewelry,
    inquiry,

    //Minh's Value

    //Values Chung
    loading,
    error,
    isLogin,
    userID,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  //console.log("context", context);
  return context;
};
