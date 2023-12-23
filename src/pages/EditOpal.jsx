import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from "react-toastify";
import '../styling/EditOpal.css';

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
        <div className="edit-container">
            <h1>EDIT OPAL</h1>
            <div>
                <label htmlFor="name" className="edit-text"><strong>Name: </strong></label>
                <input
                    type="text"
                    name="name"
                    value={opalData.name || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                />
            </div>
            <div>
                <label htmlFor="image" className="edit-text"><strong>Image: </strong></label>
                <input
                    type="text"
                    name="image"
                    value={opalData.image || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                />
            </div>
            <div>
            <label htmlFor="origin" className="edit-text"><strong>Origin: </strong></label>
            <input
                type="text"
                name="origin"
                value={opalData.origin || ''}
                onChange={handleInputChange}
                className="edit-input"
            />
            </div>
            <div>
                <label htmlFor="weight" className="edit-text"><strong>Weight: </strong></label>
                <input
                    type="number"
                    name="weight"
                    value={opalData.weight || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                />
            </div>
            <div>
                <label htmlFor="dimensions" className="edit-text"><strong>Dimensions: </strong></label>
                <input
                    type="text"
                    name="dimensions"
                    value={opalData.dimensions || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                />
            </div>
            <div>
                <label htmlFor="brightness" className="edit-text"><strong>Brightness: </strong></label>
                <input
                    type="text"
                    name="brightness"
                    value={opalData.brightness || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                />
            </div>
            <div>
                <label htmlFor="tone" className="edit-text"><strong>Tone: </strong></label>
                <input
                    type="text"
                    name="tone"
                    value={opalData.tone || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                />
            </div>
            <div>
                <label htmlFor="pricing" className="edit-text"><strong>Pricing: </strong></label>
                <input
                    type="number"
                    name="pricing"
                    value={opalData.pricing || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                />
            </div>
            <div>
                <button onClick={handleSaveClick} className="edit-button">Save</button>
            </div>
            <div>
                <button onClick={() => navigate('/opals')} className="edit-button">Go Back</button>
            </div>
        </div>
    );
};

export default EditOpal;