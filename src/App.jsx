import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Signup from "./auth/signup/Signup";
import Login from "./auth/login/Login";
import ForgetPassword from "./auth/login/ForgetPassword";
import ResetPassword from "./auth/login/resetPassword";
import ProductList from "./pages/products/ProductList";
import Category from "./pages/categories/CategoryList";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import OrderList from "./pages/orders/orderList";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="App">
        <div className="grid-container">
          {/* استخدام مكون فرعي لتحديد ما إذا كان يجب عرض Header و Sidebar */}
          <Content
            OpenSidebar={OpenSidebar}
            openSidebarToggle={openSidebarToggle}
          />
        </div>
      </div>
    </Router>
  );
}

// مكون فرعي لتحديد ما إذا كان يجب عرض Header و Sidebar
const Content = ({ OpenSidebar, openSidebarToggle }) => {
  const location = useLocation();

  // تحديد الصفحات التي لا يظهر فيها الشريط الجانبي والرأس
  const noHeaderAndSidebarRoutes = [
    "/login",
    "/",
    "/forgetPassword",
    "/resetPassword",
  ];

  return (
    <>
      {!noHeaderAndSidebarRoutes.includes(location.pathname) && (
        <>
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
        </>
      )}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </>
  );
};

export default App;
