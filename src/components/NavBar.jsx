import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'; 

const NavBar = () => {
    const { jwt, role, setAuthenticated } = useAuth();
  
    const handleLogout = () => {
        // Set jwt and role to blank for logout
        setAuthenticated({ jwt: '', role: '' });
    };

    return (
        <nav>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {jwt ? (
              // If user is logged in, show logout button
              <li><button onClick={handleLogout}>Logout</button></li>
            ) : (
              // If user is not logged in, show login link
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      );
    };
    
export default NavBar;
