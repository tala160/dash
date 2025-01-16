import { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; 

import Signup from "./Log/signup/Signup";
import Login from "./Log/login/Login";
import ForgetPassword from './Log/login/ForgetPassword';
import ResetPassword from './Log/login/ResetPassword';

import ProductList from './Home/Product/ProductList';
import Category from './Home/Category/CategoryList';
import Sidebar from './Home/Sidebar';
import Header from './Home/Header';
import Home from './Home/Home';
import OrderList from './Home/Order/orderList';
import AddProduct from './Home/Product/AddProduct';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="App">
        <div className='grid-container'>
          {/* استخدام مكون فرعي لتحديد ما إذا كان يجب عرض Header و Sidebar */}
          <Content OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
        </div>
      </div>
    </Router>
  );
}

// مكون فرعي لتحديد ما إذا كان يجب عرض Header و Sidebar
const Content = ({ OpenSidebar, openSidebarToggle }) => {
  const location = useLocation();

  // تحديد الصفحات التي لا يظهر فيها الشريط الجانبي والرأس
  const noHeaderAndSidebarRoutes = ['/login', '/' , '/forgetPassword', '/resetPassword'];

  return (
    <>
      {!noHeaderAndSidebarRoutes.includes(location.pathname) && (
        <>
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path="/categories" element={<Category />} /> 
        <Route path='/orders' element={<OrderList/>}/>
      </Routes>
    </>
  );
};

export default App;
