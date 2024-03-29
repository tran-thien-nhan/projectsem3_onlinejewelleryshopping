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
//Read
import AdminBrand from "./../components/Admin/Pages/Brand/AdminBrand";
import AdminGold from "./../components/Admin/Pages/Gold/AdminGold";
import AdminCat from "./../components/Admin/Pages/Categories/AdminCat";
import AdminStone from "./../components/Admin/Pages/Stone/AdminStone";
import UserUpdate from "../components/User/UserUpdate";
import AdminCertify from "../components/Admin/Pages/Certification/AdminCertify";
import AdminStoneQuality from "../components/Admin/Pages/StoneQuality/AdminStoneQuality";

//Create
import AdminCreateBrand from "../components/Admin/Pages/Brand/AdminCreateBrand";
import AdminCreateGold from "../components/Admin/Pages/Gold/AdminCreateGold";
import AdminCreateCat from "../components/Admin/Pages/Categories/AdminCreateCat";
import AdminCreateCertify from "../components/Admin/Pages/Certification/AdminCreateCertify";
import AdminCreateStoneQuality from "../components/Admin/Pages/StoneQuality/AdminCreateStoneQuality";

//Hung's routes
import AdminDimQlty from "./../components/Admin/Pages/AdminDimQlty";
import AdminEditDimQlty from "../components/Admin/Pages/AdminEditDimQlty";
import AdminCreateDimQlty from "./../components/Admin/Pages/AdminCreateDimQlty";
import AdminDim from "./../components/Admin/Pages/AdminDim";
import AdminCreateDim from "./../components/Admin/Pages/AdminCreateDim";
import AdminEditDim from "./../components/Admin/Pages/AdminEditDim";
import AdminProd from "./../components/Admin/Pages/AdminProd";
import AdminCreateProd from "./../components/Admin/Pages/AdminCreateProd";
import AdminEditProd from "../components/Admin/Pages/AdminEditProd";
import AdminJewelType from "./../components/Admin/Pages/AdminJewelType";
import AdminCreateJewelType from "./../components/Admin/Pages/AdminCreateJewelType";
import AdminEditJewelType from "./../components/Admin/Pages/AdminEditJewelType";
import AdminDimInfo from "../components/Admin/Pages/AdminDimInfo";
import AdminCreateDimInfo from "./../components/Admin/Pages/AdminCreateDimInfo";
import AdminEditDimInfo from "./../components/Admin/Pages/AdminEditDimInfo";
import AdminDimSub from "./../components/Admin/Pages/AdminDimSub";
import AdminCreateDimSub from "./../components/Admin/Pages/AdminCreateDimSub";
import AdminEditDimSub from "./../components/Admin/Pages/AdminEditDimSub";
import Contact from "../components/User/Contact";
import AdminInquiryList from "../components/Admin/Pages/AdminInquiryList";

import EmailForgotPass from "../components/User/Login/EmailForgotPass";
import ResetPassword from "../components/User/Login/ResetPassword";
import UserUpdatePass from "../components/User/UserUpdatePass";
import ThankYou1 from "../components/User/Order/ThankYou1";
import MomoProcessing from "../components/User/Order/MomoProcessing";
import AdminUpdateItem from "../components/Admin/Pages/AdminUpdateItem";
import AdminEditCat from "../components/Admin/Pages/Categories/AdminEditCat";
import AdminEditCertify from "../components/Admin/Pages/Certification/AdminEditCertify";
import AdminEditGold from "../components/Admin/Pages/Gold/AdminEditGold";
import AdminEditBrand from "../components/Admin/Pages/Brand/AdminEditBrand";
import AdminEditStoneQuality from "../components/Admin/Pages/StoneQuality/AdminEditStoneQuality";
import AdminCreateStone from "../components/Admin/Pages/Stone/AdminCreateStone";
import AdminEditStone from "../components/Admin/Pages/Stone/AdminEditStone";
import ItemShop from "../components/User/ItemShop";
import AdminList from "../components/Admin/Pages/AdminList";
import AdminEditInfo from "../components/Admin/Pages/AdminEditInfo";
import AdminCreateInfo from "../components/Admin/Pages/AdminCreateInfo";
import UserDiamond from "../components/User/UserDiamond";
import UserAbout from "../components/User/UserAbout";
import ItemFavorite from "../components/User/ItemFavorite";

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
    path: "/shop",
    element: <ItemShop />,
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
    path: "/thankyou1",
    element: <ThankYou1 />,
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
  {
    path: "/momoprocessing",
    element: <MomoProcessing />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/udiamond",
    element: <UserDiamond />,
  },
  {
    path: "/aboutus",
    element: <UserAbout />,
  },
  {
    path: "/wishlist",
    element: <ItemFavorite />,
  },
];

const privateRouter = [
  //Nhan's routes
  {
    path: "/movingtouser",
    element: <MovingToUser />,
    name: "",
    visible: false,
    icon: "",
  },
  {
    path: "/admin",
    element: <AdminIndex />,
    name: "Dashboard",
    visible: true,
    icon: <i className="fas fa-tachometer-alt mx-2"></i>,
  },
  {
    path: "/adminlist",
    element: <AdminList />,
    name: "Admin ",
    visible: true,
    icon: <i className="fas fa-user-cog mx-2"></i>,
  },
  {
    path: "/createadmin",
    element: <AdminCreateInfo />,
    name: "Create Admin",
    visible: false,
    icon: "",
  },
  {
    path: "/editadmin/:userName",
    element: <AdminEditInfo />,
    name: "Admin Edit Info",
    visible: false,
    icon: "",
  },
  {
    path: "/items",
    element: <AdminItemList />,
    name: "Items ",
    visible: true,
    icon: <i className="fas fa-shopping-bag mx-2"></i>,
  },
  {
    path: "/allorders",
    element: <AdminAllOrders />,
    name: "Orders ",
    visible: true,
    icon: <i className="fas fa-list-alt mx-2"></i>,
  },
  {
    path: "/order/:order_ID",
    element: <AdminOrderDetail />,
    name: "Order Detail",
    visible: false,
    icon: "",
  },
  {
    path: "/createitem",
    element: <AdminCreateItem />,
    name: "Create Item",
    visible: false,
    icon: "",
  },
  {
    path: "/edititem/:style_Code",
    element: <AdminUpdateItem />,
    name: "update item",
    visible: false,
    icon: "",
  },
  {
    path: "/userlist",
    element: <AdminUserList />,
    name: "User ",
    visible: true,
    icon: <i className="fas fa-user-friends mx-2"></i>,
  },
  {
    path: "/user/:userID",
    element: <AdminUserDetail />,
    name: "user detail",
    visible: false,
    icon: "",
  },

  //Phi route's
  {
    path: "/brands",
    element: <AdminBrand />,
    name: "Brands ",
    visible: true,
    icon: <i className="fas fa-tags mx-2"></i>,
  },
  {
    path: "/create-brand",
    element: <AdminCreateBrand />,
    name: "Create New Brand",
    visible: false,
    icon: "",
  },
  {
    path: "/edit-brand/:brand_ID",
    element: <AdminEditBrand />,
    name: "Edit Brand",
    visible: false,
    icon: "",
  },

  {
    path: "/gold_krt",
    element: <AdminGold />,
    name: "Gold Krt ",
    visible: true,
    icon: <i className="fas fa-coins mx-2"></i>,
  },
  {
    path: "/create-gold",
    element: <AdminCreateGold />,
    name: "Create New Gold Krt",
    visible: false,
    icon: "",
  },
  {
    path: "/edit-gold/:goldType_ID",
    element: <AdminEditGold />,
    name: "Edit Category",
    visible: false,
    icon: "",
  },

  {
    path: "/cat",
    element: <AdminCat />,
    name: "Category ",
    visible: true,
    icon: <i className="fas fa-list-alt mx-2"></i>,
  },
  {
    path: "/create-cat",
    element: <AdminCreateCat />,
    name: "Create New Category",
    visible: false,
    icon: "",
  },
  {
    path: "/edit-cat/:cat_ID",
    element: <AdminEditCat />,
    name: "Edit Category",
    visible: false,
    icon: "",
  },

  {
    path: "/stones",
    element: <AdminStone />,
    name: "Stone Info",
    visible: true,
    icon: <i className="fas fa-gem mx-2"></i>, // Biểu tượng đá quý
  },
  {
    path: "/create-stone",
    element: <AdminCreateStone />,
    name: "Create New Stone",
    visible: false,
    icon: "",
  },
  {
    path: "/edit-stone/:stone_ID",
    element: <AdminEditStone />,
    name: "Edit Stone",
    visible: false,
    icon: "",
  },
  {
    path: "/stone-quality",
    element: <AdminStoneQuality />,
    name: "Stone Quality",
    visible: true,
    icon: <i className="fas fa-gem mx-2"></i>, // Biểu tượng đá quý
  },

  {
    path: "/create-stone-quality",
    element: <AdminCreateStoneQuality />,
    name: "Create New Stone Quality",
    visible: false,
    icon: "",
  },
  {
    path: "/edit-stone-quality/:stoneQlty_ID",
    element: <AdminEditStoneQuality />,
    name: "Edit Category",
    visible: false,
    icon: "",
  },

  {
    path: "/certify",
    element: <AdminCertify />,
    name: "Certification ",
    visible: true,
    icon: <i className="fas fa-certificate mx-2"></i>,
  },
  {
    path: "/create-certify",
    element: <AdminCreateCertify />,
    name: "Create New Certification",
    visible: false,
    icon: "",
  },
  {
    path: "/edit-certify/:certify_ID",
    element: <AdminEditCertify />,
    name: "Edit Certification",
    visible: false,
    icon: "",
  },

  //Hung
  //Hung route's
  {
    path: "/dimQlty",
    element: <AdminDimQlty />,
    name: "Diamond Qlty ",
    visible: true,
    icon: <i className="fas fa-gem mx-2"></i>,
  },
  {
    path: "/createDimQlty",
    element: <AdminCreateDimQlty />,
    name: "CreateDimQlty",
    visible: false,
    icon: "",
  },
  {
    path: "/editDimQlty/:id",
    element: <AdminEditDimQlty />,
    name: "editDimQlty",
    visible: false,
    icon: "",
  },

  {
    path: "/dim",
    element: <AdminDim />,
    name: "Diamond",
    visible: true,
    icon: <i className="fas fa-ruler mx-2"></i>, // Biểu tượng cho kích thước
  },
  {
    path: "/create-dim",
    element: <AdminCreateDim />,
    name: "CreateDimQlty",
    visible: false,
    icon: "",
  },
  {
    path: "/edit-dim/:dimMst_ID",
    element: <AdminEditDim />,
    name: "editDim",
    visible: false,
    icon: "",
  },
  {
    path: "/prod",
    element: <AdminProd />,
    name: "Prod",
    visible: true,
    icon: <i className="fas fa-box mx-2"></i>, // Biểu tượng cho sản phẩm
  },
  {
    path: "/createProd",
    element: <AdminCreateProd />,
    name: "CreateProd",
    visible: false,
    icon: "",
  },
  {
    path: "/editProd/:id",
    element: <AdminEditProd />,
    name: "editDimSub",
    visible: false,
    icon: "",
  },
  {
    path: "/dimQltySub",
    element: <AdminDimSub />,
    name: "DimQltySub",
    visible: true,
    icon: <i className="fas fa-layer-group mx-2"></i>, // Biểu tượng cho các phụ thuộc kích thước
  },
  {
    path: "/createDimQltySub",
    element: <AdminCreateDimSub />,
    name: "CreateDimSub",
    visible: false,
    icon: "",
  },
  {
    path: "/editDimQltySub/:id",
    element: <AdminEditDimSub />,
    name: "editDimSub",
    visible: false,
    icon: "",
  },
  {
    path: "/dimInfo",
    element: <AdminDimInfo />,
    name: "Diamond Info",
    visible: true,
    icon: <i className="fas fa-info-circle mx-2"></i>, // Biểu tượng cho thông tin kích thước
  },
  {
    path: "/createDimInfo",
    element: <AdminCreateDimInfo />,
    name: "Create DimInfo",
    visible: false,
    icon: "",
  },
  {
    path: "/editDimInfo/:id",
    element: <AdminEditDimInfo />,
    name: "Create DimInfo",
    visible: false,
    icon: "",
  },
  {
    path: "/jewelType",
    element: <AdminJewelType />,
    name: "JewelType",
    visible: true,
    icon: <i className="fas fa-gem mx-2"></i>, // Biểu tượng cho loại đá quý
  },
  {
    path: "/createJewelType",
    element: <AdminCreateJewelType />,
    name: "Create JewelType",
    visible: false,
    icon: "",
  },
  {
    path: "/editJewelType/:id",
    element: <AdminEditJewelType />,
    name: "edit JewelType",
    visible: false,
    icon: "",
  },
  {
    path: "/inquiryList",
    element: <AdminInquiryList />,
    name: "Inquiry",
    visible: true,
    icon: <i className="fas fa-list-alt mx-2"></i>,
  },
];

export { publicRouter, privateRouter };
