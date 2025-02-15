import React from 'react';
import {
  BsCart3,
  BsFillXCircleFill 
} from 'react-icons/bs';
import logo from "../../../public/logo.jpg"
import { AiFillHome } from 'react-icons/ai';
import { FaBoxOpen } from 'react-icons/fa'; 
import { BiCategory } from 'react-icons/bi'; 
import { FiShoppingCart } from 'react-icons/fi'; 
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../App.css';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""} style={{ height: '100vh' }}>
      <div className='sidebar-title d-flex justify-content-between align-items-center p-3'>
        <div className='sidebar-brand'>
           <img src={logo} alt='' width="50%"/>
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>
          <BsFillXCircleFill  style={{ cursor: 'pointer', color: '#9E9E9E', fontSize: '25px' }}/>
        </span>
      </div>

      <ul className='sidebar-list list-unstyled'>
        <li className='sidebar-list-item'>
          <Link to="/home" className='text-light d-flex align-items-center p-3'>
            <AiFillHome className='icon' /> Home 
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/categories" className='text-light d-flex align-items-center p-3'>
            <BiCategory className='icon' /> Categories 
          </Link>
        </li>
        
        <li className='sidebar-list-item'>
          <Link to="/products" className='text-light d-flex align-items-center p-3'>
            <FaBoxOpen className='icon' /> Products 
          </Link>
        </li>

        <li className='sidebar-list-item'>
          <Link to="/orders" className='text-light d-flex align-items-center p-3'>
            <FiShoppingCart className='icon' /> Orders 
          </Link>
        </li>

        <li className='sidebar-list-item'>
          <Link to="/profile" className='text-light d-flex align-items-center p-3'>
            <FaUser className='icon' /> Profile 
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
