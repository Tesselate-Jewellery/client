import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header>
            <Link to="/" className="home-link">
                <h1>Tesselate Jewellery</h1>
            </Link>
            <Link to="/dashboard">
                <span>Dashboard</span>
            </Link>
        </header>
    );
};

export default Header;