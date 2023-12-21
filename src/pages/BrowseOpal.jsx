import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from "react-toastify";

const BrowseOpal = () => {
    const { opal_id } = useParams();
    const navigate = useNavigate();
    const { jwt } = useAuth();
    const [opalData, setOpalData] = useState({});
    const [ringSize, setRingSize] = useState('');
    const [selectedMetal, setSelectedMetal] = useState('');
    const [selectedSetting, setSelectedSetting] = useState('');
    const [metalAdditionalPrice, setMetalAdditionalPrice] = useState(0);
    const [settingAdditionalPrice, setSettingAdditionalPrice] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState(opalData.pricing); // Set initial value to opalData.pricing

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}opals/${opal_id}`
                );
                setOpalData(response.data);

                // Update calculatedPrice once opal data is fetched
                setCalculatedPrice(response.data.pricing + metalAdditionalPrice + settingAdditionalPrice);
            } catch (error) {
                console.error('Error fetching opal data:', error);
            }
        };

        fetchData();
    }, [opal_id, metalAdditionalPrice, settingAdditionalPrice]);

    const handleMetalChange = (metal) => {
        // You can add logic here to calculate the additional price based on the selected metal
        // For simplicity, let's assume an additional $50 for 9ct Gold and $100 for 18ct Gold
        let additionalPrice = 0;
        if (metal === 'Silver') {
            additionalPrice = 50;
        } else if (metal === '9ct Gold') {
            additionalPrice = 100;
        } else if (metal === '18ct Gold') {
            additionalPrice = 200;
        } else if (metal === '') {
            additionalPrice = 0;
        }

        setSelectedMetal(metal);
        setMetalAdditionalPrice(additionalPrice);
        setCalculatedPrice(opalData.pricing + additionalPrice + settingAdditionalPrice);
    };

    const handleSettingChange = (setting) => {
        // You can add logic here to calculate the additional price based on the selected setting
        // For simplicity, let's assume an additional $30 for bezel setting and $20 for claw setting
        let additionalPrice = 0;
        if (setting === 'bezel') {
            additionalPrice = 100;
        } else if (setting === 'claw') {
            additionalPrice = 200;
        } else if (setting === '') {
            additionalPrice = 0;
        }

        setSelectedSetting(setting);
        setSettingAdditionalPrice(additionalPrice);
        setCalculatedPrice(opalData.pricing + metalAdditionalPrice + additionalPrice);
    };

    const handleRingSizeChange = (size) => {
        setRingSize(size);
    };

    const handleSendQuote = async () => {
        try {
            // Check if the user is authenticated (has a valid JWT)
            if (!jwt) {
                // Redirect to the login page if not authenticated
                navigate('/login');
                toast.error("Must be logged in to send a quote!")
                return;
            }

            // Prepare data for the POST request
            const quoteData = {
                metal: selectedMetal,
                setting: selectedSetting,   
                ringSize: ringSize,
                pricing: calculatedPrice,
                opal: opal_id,
            };

            // Send the POST request to the quote endpoint
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}quotes`,
                quoteData,
                {
                    headers: {
                        jwt: jwt,
                    },
                }
            );

            // Display success message and redirect to a thank you page
            navigate(`/thank-you/${calculatedPrice}/${opalData.name}`);
        } catch (error) {
            console.error('Error sending quote:', error);
        }
    };

    return (
        <div>
            <h1>{opalData.name}</h1>
            <p><strong>Image:</strong> {opalData.image}</p>
            <p><strong>Origin:</strong> {opalData.origin}</p>
            <p><strong>Weight:</strong> {opalData.weight}</p>
            <p><strong>Dimensions:</strong> {opalData.dimensions}</p>
            <p><strong>Brightness:</strong> {opalData.brightness}</p>
            <p><strong>Tone:</strong> {opalData.tone}</p>
            <p><strong>Pricing:</strong> ${opalData.pricing}</p>

            {/* Dropdown for Metal Options */}
            <label>Select Metal:</label>
            <select onChange={(event) => handleMetalChange(event.target.value)}>
                <option value="">Select Metal</option>
                <option value="Silver">Silver</option>
                <option value="9ct Gold">9ct Gold</option>
                <option value="18ct Gold">18ct Gold</option>
            </select>

            {/* Dropdown for Ring Setting Options */}
            <label>Select Ring Setting:</label>
            <select onChange={(event) => handleSettingChange(event.target.value)}>
                <option value="">Select Setting</option>
                <option value="bezel">Bezel</option>
                <option value="claw">Claw</option>
            </select>

            {/* Dropdown for Ring Sizes */}
            <label>Select Ring Size:</label>
            <select onChange={(event) => handleRingSizeChange(event.target.value)}>
                <option value="">Select Ring Size</option>
                <option value="E">E</option>
                <option value="E 1/2">E 1/2</option>
                <option value="F">F</option>
                <option value="F 1/2">F 1/2</option>
                <option value="G">G</option>
                <option value="G 1/2">G 1/2</option>
                <option value="H">H</option>
                <option value="H 1/2">H 1/2</option>
                <option value="I">I</option>
                <option value="I 1/2">I 1/2</option>
                <option value="J">J</option>
                <option value="J 1/2">J 1/2</option>
                <option value="K">K</option>
                <option value="K 1/2">K 1/2</option>
                <option value="L">L</option>
                <option value="L 1/2">L 1/2</option>
                <option value="M">M</option>
                <option value="M 1/2">M 1/2</option>
                <option value="N">N</option>
                <option value="N 1/2">N 1/2</option>
                <option value="O">O</option>
                <option value="O 1/2">O 1/2</option>
                <option value="P">P</option>
                <option value="P 1/2">P 1/2</option>
                <option value="Q">Q</option>
                <option value="Q 1/2">Q 1/2</option>
                <option value="R">R</option>
                <option value="R 1/2">R 1/2</option>
                <option value="S">S</option>
                <option value="S 1/2">S 1/2</option>
                <option value="T">T</option>
                <option value="T 1/2">T 1/2</option>
                <option value="U">U</option>
                <option value="U 1/2">U 1/2</option>
                <option value="V">V</option>
                <option value="V 1/2">V 1/2</option>
                <option value="W">W</option>
                <option value="W 1/2">W 1/2</option>
                <option value="X">X</option>
                <option value="X 1/2">X 1/2</option>
                <option value="Y">Y</option>
                <option value="Y 1/2">Y 1/2</option>
                <option value="Z">Z</option>
            </select>

            {/* Display calculated price */}
            <p><strong>Calculated Price:</strong> ${calculatedPrice}</p>

            {/* Button to send quote */}
            <button onClick={handleSendQuote}>Send Quote</button>
        </div>
    );
};

export default BrowseOpal;