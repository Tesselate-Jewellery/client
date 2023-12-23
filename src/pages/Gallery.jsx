import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/Gallery.css'

const LoadingIndicator = () => <p className="loading-indicator">Loading...</p>;

const Gallery = () => {
    const navigate = useNavigate();
    const [opalsData, setOpalsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // When button is clicked navigate to page to see opal
    const handleSeeMoreClick = (opalId) => {
        navigate(`/browse-opal/${opalId}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Set a loading state
                setIsLoading(true);

                // Make GET request
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}opals`);

                // console.log(response.data);
                // set state to response
                setOpalsData(response.data.opalsArray);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const OpalDetails = ({ opal }) => {
        return (
            <div className="opal-card" key={opal._id}>
                <h3 className="opal-name">{opal.name}</h3>
                <img src={opal.image} alt={`Opal named ${opal.name}`} className="opal-image"/>
                <p className="opal-text">{opal.origin}</p>
                <p className="opal-text-price">From: <strong>${opal.pricing}</strong></p>
                <button className="see-more-button" onClick={() => handleSeeMoreClick(opal._id)}>See More</button>
            </div>
        );
    };

    // Render the opals 
    const renderOpals = (opalsData) => {
        if (Array.isArray(opalsData) && opalsData.length > 0) {
            return (
                <div className="opal-gallery">
                    {opalsData.map((opal) => <OpalDetails key={opal._id} opal={opal} />)}
                </div>
            );
        } else {
            return <p className="no-opals-message">No opals data available</p>;
        }
    };

    return (
        <div>
            <div>
                <h1 className="opal-title">OPAL GALLERY</h1>
            </div>
            <div>
                {/* If isLoading is true, displaying loading indicator, otherwise display opals */}
                {isLoading ? <LoadingIndicator /> : renderOpals(opalsData)}
            </div>
        </div>
    );
};

export default Gallery;