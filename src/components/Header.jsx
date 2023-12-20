import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Header = () => {
    const { jwt } = useAuth();

    return (
        <header>
            <Link to="/" className="home-link">
                <h1>Tesselate Jewellery</h1>
            </Link>
            <Link to="/dashboard">
                {jwt ? <span>Dashboard</span> : <span></span>}
            </Link>
        </header>
    );
};

export default Header;

