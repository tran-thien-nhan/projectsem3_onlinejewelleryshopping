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
import AdminOrderDetail from "../components/Admin/Pages/AdminOrderDetail";
import AdminCreateItem from "../components/Admin/Pages/AdminCreateItem";
import AdminUserList from "../components/Admin/Pages/AdminUserList";
import AdminUserDetail from "../components/Admin/Pages/AdminUserDetail";
import VerifyEmailSuccess from "../Pages/VerifyEmailSuccess";

//Phi's routes
import AdminBrand from './../components/Admin/Pages/AdminBrand';
import AdminGold from './../components/Admin/Pages/AdminGold';
import AdminCat from './../components/Admin/Pages/AdminCat';
import AdminStone from './../components/Admin/Pages/AdminStone';
import UserUpdate from "../components/User/UserUpdate";
import AdminCertify from "../components/Admin/Pages/AdminCertify";


//Hung's routes
import AdminDimQlty from './../components/Admin/Pages/AdminDimQlty';
import AdminDim from './../components/Admin/Pages/AdminDim';
import AdminProd from './../components/Admin/Pages/AdminProd';
// import AdminDimInfo from "../components/Admin/Pages/AdminDimInfo";
import AdminDimSub from './../components/Admin/Pages/AdminDimSub';
import EmailForgotPass from "../components/User/Login/EmailForgotPass";
import ResetPassword from "../components/User/Login/ResetPassword";
import UserUpdatePass from "../components/User/UserUpdatePass";


//Minh's routes





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
  {
    path: "/verifyemailsuccess/:token",
    element: <VerifyEmailSuccess />,
  },
  {
    path: "/updateuser",
    element: <UserUpdate />,
  },
  {
    path: "/emailforgotpass",
    element: <EmailForgotPass />,
  },
  {
    path: "/resetpassword/:token",
    element: <ResetPassword />,
  },
  {
    path: "/updateuserpass",
    element: <UserUpdatePass />,
  },
];

const privateRouter = [
  //Nhan's routes
  {
    path: "/movingtouser",
    element: <MovingToUser />,
    name: "",
    visible: false,
  },
  {
    path: "/admin",
    element: <AdminIndex />,
    name: "Dashboard",
    visible: true,
  },
  {
    path: "/items",
    element: <AdminItemList />,
    name: "Items Management",
    visible: true,
  },
  {
    path: "/allorders",
    element: <AdminAllOrders />,
    name: "Orders Management",
    visible: true,
  },
  {
    path: "/order/:order_ID",
    element: <AdminOrderDetail />,
    name: "Order Detail",
    visible: false,
  },
  {
    path: "/createitem",
    element: <AdminCreateItem />,
    name: "Create Item",
    visible: false,
  },
  {
    path: "/userlist",
    element: <AdminUserList />,
    name: "User Management",
    visible: true,
  },
  {
    path: "/user/:userID",
    element: <AdminUserDetail />,
    name: "user detail",
    visible: false,
  },

  //Phi route's
  {
    path: "/brands",
    element: <AdminBrand />,
    name: "Brands List",
    visible: true,
  },
  {
    path: "/gold_krt",
    element: <AdminGold />,
    name: "Gold Krt List",
    visible: true,
  },
  {
    path: "/cat",
    element: <AdminCat />,
    name: "Category List",
    visible: true,
  },
  {
    path: "/stones",
    element: <AdminStone />,
    name: "Stone Information List",
    visible: true,
  },
  // {
  //   path: "/stone_quality",
  //   element: <AdminAllOrders />,
  //   name: "Orders List",
  //   visible: true,
  // },

  {
    path: "/certify",
    element: <AdminCertify />,
    name: "Certification List",
    visible: true,
  },

  //Hung
  //Hung route's
  {
    path: "/dimQlty",
    element: <AdminDimQlty />,
    name: "DimQlty List",
    visible: true,
  },
  {
    path: "/dim",
    element: <AdminDim />,
    name: "Dim List",
    visible: true,
  },
  {
    path: "/prod",
    element: <AdminProd />,
    name: "Prod List",
    visible: true,
  },
  // {
  //   path: "/dimInfo",
  //   element: <AdminDimInfo/>,
  //   name: "DimInfo List",
  //   visible: true,
  // },
  {
    path: "/dimQltySub",
    element: <AdminDimSub />,
    name: "DimQltySub List",
    visible: true,
  },
];

export { publicRouter, privateRouter };
