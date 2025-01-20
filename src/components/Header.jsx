import React from 'react'
import 
 {BsFillEnvelopeFill, BsSearch, BsJustify}
 from 'react-icons/bs'
 import { BiLogOut } from 'react-icons/bi';
function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            
        </div>
        <div className='header-right'>          
            <BsFillEnvelopeFill className='icon'/>
            <BiLogOut className="icon" />
        </div>
    </header>
  )
}

export default Header