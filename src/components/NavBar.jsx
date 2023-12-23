import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/NavBar.css';

const NavBar = () => {

    return (
        <nav className="nav-container">
          <div>
            <Link to="/about">ABOUT</Link>
          </div>
          <div>
            <Link to="/gallery">GALLERY</Link>
          </div>
          <div>
            <Link to="/faq">FAQ</Link>
          </div>
          <div>
            <Link to="/contact">CONTACT US</Link>
          </div>
        </nav>
      );
    };
    
export default NavBar;
