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

    const handleInputChange = (event) => {
        setOpalData({
            ...opalData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSaveClick = async () => {
        try {
            await axios.put(
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
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={opalData.name || ''}
                onChange={handleInputChange}
            />
            <label>Image:</label>
            <input
                type="text"
                name="image"
                value={opalData.image || ''}
                onChange={handleInputChange}
            />
            <label>Origin:</label>
            <input
                type="text"
                name="origin"
                value={opalData.origin || ''}
                onChange={handleInputChange}
            />
            <label>Weight:</label>
            <input
                type="number"
                name="weight"
                value={opalData.weight || ''}
                onChange={handleInputChange}
            />
            <label>Dimensions:</label>
            <input
                type="text"
                name="dimensions"
                value={opalData.dimensions || ''}
                onChange={handleInputChange}
            />
            <label>Brightness:</label>
            <input
                type="text"
                name="brightness"
                value={opalData.brightness || ''}
                onChange={handleInputChange}
            />
            <label>Tone:</label>
            <input
                type="text"
                name="tone"
                value={opalData.tone || ''}
                onChange={handleInputChange}
            />
            <label>Pricing:</label>
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