import Page404 from "../Pages/Page404";
import CartList from "../components/User/Cart/CartList";
import Checkout from "../components/User/Checkout/Checkout";
import ItemDetail from "../components/User/ItemDetail";
import ItemList from "../components/User/ItemList";
import Login from "../components/User/Login/Login";
import Register from "../components/User/Login/Register";
import Order from "../components/User/Order/Order";
import OrderDetail from "../components/User/Order/OrderDetail";
import Thankyou from "../components/User/Order/ThankYou";
import UserInfo from "../components/User/UserInfo";
import AdminDashboard from "../components/Admin/AdminDashboard";
import MovingToAdmin from "../components/User/MovingToAdmin";
import MovingToUser from "../components/Admin/MovingToUser";
import AdminItemList from "../components/Admin/Pages/AdminItemList";
import AdminIndex from "../components/Admin/Pages/AdminIndex";
import AdminAllOrders from "../components/Admin/Pages/AdminAllOrders";

const publicRouter = [
  {
    path: "/",
    element: <ItemList />,
  },
  {
    path: "/item/:styleCode",
    element: <ItemDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/cart",
    element: <CartList />,
  },
  {
    path: "/info",
    element: <UserInfo />,
  },
  {
    path: "/thankyou",
    element: <Thankyou />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/order/:order_ID",
    element: <OrderDetail />,
  },
  {
    path: "/movingtoadmin",
    element: <MovingToAdmin />,
  },
    // {
    //   path: "*",
    //   element: <Page404 />,
    // },
];

const privateRouter = [
  {
    path: "/movingtouser",
    element: <MovingToUser />,
    name: "",
  },
  {
    path: "/admin",
    element: <AdminIndex />,
    name: "Index",
  },
  {
    path: "/items",
    element: <AdminItemList />,
    name: "Items List",
  },
  {
    path: "/allorders",
    element: <AdminAllOrders />,
    name: "Orders List",
  }
];

export { publicRouter, privateRouter };
