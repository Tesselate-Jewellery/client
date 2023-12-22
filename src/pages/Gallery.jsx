import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/Gallery.css'

const LoadingIndicator = () => <p>Loading...</p>;

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
            <div key={opal._id}>
                <h2>{opal.name}</h2>
                <img src={opal.image} alt={`Opal named ${opal.name}`}/>
                <h3>{opal.origin}</h3>
                <h3>From: ${opal.pricing}</h3>
                <button onClick={() => handleSeeMoreClick(opal._id)}>See More</button>
            </div>
        );
    };

    // Render the opals 
    const renderOpals = (opalsData) => {
        if (Array.isArray(opalsData) && opalsData.length > 0) {
            return opalsData.map((opal) => <OpalDetails key={opal._id} opal={opal} />);
        } else {
            return <p>No opals data available</p>;
        }
    };

    return (
        <div>
            <h2>Opals</h2>
            {/* If isLoading is true, displaying loading indicator, otherwise display opals */}
            {isLoading ? <LoadingIndicator /> : renderOpals(opalsData)}
        </div>
    );
};

export default Gallery;