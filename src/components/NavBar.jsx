import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <nav>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
      );
    };
    
export default NavBar;
