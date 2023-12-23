import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import '../styling/Header.css';

const Header = () => {
    const { jwt, setAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Set jwt and role to blank for logout
        setAuthenticated({ jwt: '', role: '', userID: '' });
        navigate("/")
        toast.success("Successfully Logged Out!");
    };

    return (
        <header className="header-container">
            <div className="header-logo">
                <Link to="/" className="home-link">
                    <img className="header-image" src="/assets/tesselate_jewellery.jpg" alt="Tesselate Jewellery" />
                </Link>
            </div>
            <div className="header-links">
                <div>
                    <Link to="/dashboard">
                        {jwt ? <span className="dashboard-link">Dashboard</span> : <span></span>}
                    </Link>
                </div>
                <div className="login-out-link">
                    {jwt ? (
                        // If user is logged in, show logout button
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    ) : (
                        // If user is not logged in, show login link
                        <Link to="/login" className="header-login-button">
                                Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
