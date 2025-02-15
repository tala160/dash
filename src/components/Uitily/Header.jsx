import React from 'react'
import 
 { BsJustify}
 from 'react-icons/bs';
 import { useDispatch } from 'react-redux';
 import { BiLogOut } from 'react-icons/bi';
 import { logout } from '../../redux/authSlice';
 import { useNavigate } from 'react-router-dom';

function Header({OpenSidebar}) {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    //  Dispatch the logout action
    navigate('/login'); 
  };

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}
            style={{ cursor: 'pointer', color: '#9E9E9E', fontSize: '30px' }}/>
        </div>
        <div className='header-left'>
            
        </div>
        <div className='header-right'>          
            {/* <BsFillEnvelopeFill className='icon'/> */}
            <BiLogOut className="icon" onClick={handleLogout}
            style={{ cursor: 'pointer', color: '#9E9E9E', fontSize: '30px' }} />
        </div>
    </header>
  )
}

export default Header