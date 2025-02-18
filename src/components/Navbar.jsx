import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import '../scss/Navbar.scss';
import logo from '../assets/logo.png';
import {FaBars } from 'react-icons/fa';

import { GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";


import Cart from './Cart';
export const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("overlay").style.display = "none";
  document.body.style.overflow = "auto";
  // window.scrollTo(0,0)
};

export const openCart = () => {

  document.getElementById("mySidenav").style.width = "340px";
  document.getElementById("overlay").style.display = "block";
  document.body.style.overflow = "hidden";
};

const Navbar = () => {
  const Navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

 
  

  return (
    <nav className="navbar">
      <div className='overlay' id='overlay' onClick={closeNav}></div>
      <div className='sidenav' id='mySidenav'>
        <Cart />
      </div>
      <div className="navbar_logo">
        <img src={logo} alt="Logo" onClick={() => Navigate('/')} />
      </div>
      <div className={`navbar_links ${isMenuOpen ? 'navbar__links--open' : ''}`}>
        {/* <a href="/">Home</a>
        <a href="/Collection">Collection</a>
        <a href="#contact">Contact</a> */}

        <Link to='/'>Home</Link>
        <Link to='/Collection'>Collection</Link>
        <Link to='/'>Contact</Link>

      </div>
      <div className="navbar__icons">
      {/* <GoSearch className="icon" /> */}
        <FaRegUser className="icon" onClick={()=>navigate('/signup')} />
        <IoCartOutline className="icon" onClick={() => openCart()} />
        <FaBars className="menu-icon" onClick={toggleMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
