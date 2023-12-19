import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Header = () => {
    const { jwt, role } = useAuth();

    const showDashboardLink = jwt && ["admin", "staff"].includes(role);

    return (
        <header>
            <Link to="/" className="home-link">
                <h1>Tesselate Jewellery</h1>
            </Link>
            {showDashboardLink && (
                // If user is logged in as admin or staff, show dashboard
                <Link to="/dashboard">
                    <span>Dashboard</span>
                </Link>
            )}
        </header>
    );
};

export default Header;