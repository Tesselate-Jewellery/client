import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from "react-toastify";

const EditOpal = () => {
    const { opal_id } = useParams();
    const { jwt } = useAuth();
    const navigate = useNavigate();
    const [opalData, setOpalData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make GET request
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}opals/${opal_id}`,
                    {
                        headers: {
                            jwt: jwt,
                        },
                    }
                );
                setOpalData(response.data);
            } catch (error) {
                console.error('Error fetching opal data:', error);
            }
        };

        fetchData();
    }, [opal_id, jwt]);

    // Update state when input fields change
    const handleInputChange = (event) => {
        setOpalData({
            // Spread operator, state should be immutable
            ...opalData,
            [event.target.name]: event.target.value,
        });
    };

    // When "Save" button is clicked
    const handleSaveClick = async () => {
        try {
            await axios.put(
                // Make PUT request
                `${process.env.REACT_APP_BACKEND_URL}opals/${opal_id}`,
                opalData,
                {
                    headers: {
                        jwt: jwt,
                    },
                }
            );
            toast.success("Opal Saved!");
        } catch (error) {
            console.error('Error saving opal data:', error);
        }
    };

    return (
        <div>
            <h1>Edit Opal</h1>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                name="name"
                value={opalData.name || ''}
                onChange={handleInputChange}
            />
            <label htmlFor="image">Image:</label>
            <input
                type="text"
                name="image"
                value={opalData.image || ''}
                onChange={handleInputChange}
            />
            <label htmlFor="origin">Origin:</label>
            <input
                type="text"
                name="origin"
                value={opalData.origin || ''}
                onChange={handleInputChange}
            />
            <label htmlFor="weight">Weight:</label>
            <input
                type="number"
                name="weight"
                value={opalData.weight || ''}
                onChange={handleInputChange}
            />
            <label htmlFor="dimensions">Dimensions:</label>
            <input
                type="text"
                name="dimensions"
                value={opalData.dimensions || ''}
                onChange={handleInputChange}
            />
            <label htmlFor="brightness">Brightness:</label>
            <input
                type="text"
                name="brightness"
                value={opalData.brightness || ''}
                onChange={handleInputChange}
            />
            <label htmlFor="tone">Tone:</label>
            <input
                type="text"
                name="tone"
                value={opalData.tone || ''}
                onChange={handleInputChange}
            />
            <label htmlFor="pricing">Pricing:</label>
            <input
                type="number"
                name="pricing"
                value={opalData.pricing || ''}
                onChange={handleInputChange}
            />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => navigate('/opals')}>Go Back</button>
        </div>
    );
};

export default EditOpal;