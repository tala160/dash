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
import Sidebar from "./components/Uitily/Sidebar";
import Header from "./components/Uitily/Header";
import Home from "./pages/Home";
import OrderList from "./pages/orders/orderList";
import Profile from './pages/Profile';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="App">
        <div className="grid-container">
          
          <Content
            OpenSidebar={OpenSidebar}
            openSidebarToggle={openSidebarToggle}
          />
        </div>
      </div>
    </Router>
  );
}


const Content = ({ OpenSidebar, openSidebarToggle }) => {
  const location = useLocation();


  const noHeaderAndSidebarRoutes = [
    "/login",
    "/",
    "/forget-password",
    "/reset-Password",
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
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/products" element={<ProductList />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </>
  );
};

export default App;
