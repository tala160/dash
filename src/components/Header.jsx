import React from 'react'
import 
 {BsFillEnvelopeFill, BsSearch, BsJustify}
 from 'react-icons/bs';
 import { useDispatch } from 'react-redux';
 import { BiLogOut } from 'react-icons/bi';
 import { signupUser } from '../redux/authSlice';
function Header({OpenSidebar}) {
  const dispatch = useDispatch(); 

  const handleLogout = () => {
    dispatch(signupUser()); // Dispatch the logout action
    // Optionally, you can also redirect the user to a login page or home page after logout
    // For example:
    // window.location.href = '/login'; 
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