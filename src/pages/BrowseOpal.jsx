import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from "react-toastify";
import '../styling/BrowseOpal.css';

// Loading indicator says Loading every time drop box is changed for quote. Not ideal
// const LoadingIndicator = () => <p className="loading-indicator">Loading...</p>;

const BrowseOpal = () => {
    const { opal_id } = useParams();
    const navigate = useNavigate();
    const { jwt } = useAuth();
    // const [isLoading, setIsLoading] = useState(true);
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
                // Make GET request
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}opals/${opal_id}`
                );
                // set state with response.data
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
            additionalPrice = 200;
        } else if (metal === '9ct Gold') {
            additionalPrice = 600;
        } else if (metal === '18ct Gold') {
            additionalPrice = 1200;
        } else if (metal === '') {
            additionalPrice = 0;
        }

        // Set selected metal to state
        setSelectedMetal(metal);
        // Depending on option chosen, set price to state
        setMetalAdditionalPrice(additionalPrice);
        // Calculate total price
        setCalculatedPrice(opalData.pricing + additionalPrice + settingAdditionalPrice);
    };

    const handleSettingChange = (setting) => {
        // You can add logic here to calculate the additional price based on the selected setting
        // For simplicity, let's assume an additional $30 for bezel setting and $20 for claw setting
        let additionalPrice = 0;
        if (setting === 'bezel') {
            additionalPrice = 100;
        } else if (setting === 'claw') {
            additionalPrice = 250;
        } else if (setting === '') {
            additionalPrice = 0;
        }

        setSelectedSetting(setting);
        // Set the price of the setting to state
        setSettingAdditionalPrice(additionalPrice);
        // Calculate total quote price
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
            <div className="browse-container">
                <div>
                    <img src={opalData.image} alt={`Opal named ${opalData.name}`} className="single-opal-img" />
                </div>
                <div className="content-container">
                    <h1 className="browse-title">{opalData.name}</h1>
                    <p><strong>Pricing:</strong> ${opalData.pricing}</p>
                    <p><strong>Origin:</strong> {opalData.origin}</p>
                    <p><strong>Weight:</strong> {opalData.weight}ct</p>
                    <p><strong>Dimensions:</strong> {opalData.dimensions}</p>
                    <p><strong>Brightness:</strong> {opalData.brightness}</p>
                    <p><strong>Tone:</strong> {opalData.tone}</p>
                </div>
            </div>
            <p className="specifications-title">CHOOSE YOUR SPECIFICATIONS</p>
            <div className="specifications-container">
                <div>
                    {/* Dropdown for Metal Options */}
                    <label className="options-label">Select Metal: </label>
                    <select onChange={(event) => handleMetalChange(event.target.value)}>
                        <option value="">Select Metal</option>
                        <option value="Silver">Silver</option>
                        <option value="9ct Gold">9ct Gold</option>
                        <option value="18ct Gold">18ct Gold</option>
                    </select>
                </div>

                <div>
                    {/* Dropdown for Ring Setting Options */}
                    <label className="options-label">Select Ring Setting: </label>
                        <select onChange={(event) => handleSettingChange(event.target.value)}>
                        <option value="">Select Setting</option>
                        <option value="bezel">Bezel</option>
                        <option value="claw">Claw</option>
                    </select>
                </div>

                <div>
                    {/* Dropdown for Ring Sizes */}
                    <label className="options-label">Select Ring Size: </label>
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
                </div>
                <div>
                    <p>If you would like to purchase the opal separately, please leave all options blank.</p>
                </div>

                <div>
                    {/* Display calculated price */}
                    <p className="price-text"><strong>Total Price:</strong> ${calculatedPrice}</p>
                </div>
                <div>
                    {/* Button to send quote */}
                    <button className="quote-button" onClick={handleSendQuote}>Send Quote</button>
                </div>
            </div>
        </div>
    );
};

export default BrowseOpal;


