import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoadingIndicator = () => <p>Loading...</p>;

const Gallery = () => {
    const navigate = useNavigate();
    const [opalsData, setOpalsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleSeeMoreClick = (opalId) => {
        navigate(`/browse-opal/${opalId}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}opals`);

                console.log(response.data);
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
                <h3>{opal.image}</h3>
                <h3>{opal.origin}</h3>
                <h3>From: ${opal.pricing}</h3>
                <button onClick={() => handleSeeMoreClick(opal._id)}>See More</button>
            </div>
        );
    };

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
            {isLoading ? <LoadingIndicator /> : renderOpals(opalsData)}
        </div>
    );
};

export default Gallery;