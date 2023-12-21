import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { jwt, setAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Set jwt and role to blank for logout
        setAuthenticated({ jwt: '', role: '', userID: '' });
        toast.success("Successfully Logged Out!");
        navigate("/")
    };

    return (
        <header>
            <Link to="/" className="home-link">
                <h1>Tesselate Jewellery</h1>
            </Link>
            <Link to="/dashboard">
                {jwt ? <span>Dashboard</span> : <span></span>}
            </Link>
            {jwt ? (
              // If user is logged in, show logout button
              <li><button onClick={handleLogout}>Logout</button></li>
            ) : (
              // If user is not logged in, show login link
              <li><Link to="/login">Login</Link></li>
            )}
        </header>
    );
};

export default Header;

