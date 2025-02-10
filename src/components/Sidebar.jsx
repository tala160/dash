import React from 'react';
import {
  BsCart3,
  BsFillXCircleFill 
} from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { FaBoxOpen } from 'react-icons/fa'; 
import { BiCategory } from 'react-icons/bi'; 
import { FiShoppingCart } from 'react-icons/fi'; 
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""} style={{ height: '100vh' }}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
           SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>
          <BsFillXCircleFill  style={{ cursor: 'pointer', color: '#9E9E9E', fontSize: '25px' }}/>
        </span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/home">
            <AiFillHome className='icon' /> Home 
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/categories">
            <BiCategory className='icon' /> Categories 
          </Link>
        </li>
        
        <li className='sidebar-list-item'>
          <Link to="/products">
            <FaBoxOpen className='icon' /> Products 
          </Link>
        </li>

        <li className='sidebar-list-item'>
          <Link to="/orders">
            <FiShoppingCart className='icon' /> Orders 
          </Link>
        </li>

        <li className='sidebar-list-item'>
          <Link to="/profile">
            <FaUser className='icon' /> Profile 
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
