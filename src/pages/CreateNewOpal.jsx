import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styling/CreateNewOpal.css';

const CreateNewOpal = () => {
    const { jwt } = useAuth();
    const navigate = useNavigate();
    const [newOpal, setNewOpal] = useState({
      name: '',
      image: '',
      origin: '',
      weight: '',
      dimensions: '',
      brightness: '',
      tone: '',
      pricing: '',
    });

    // Update state of component when value of input field changes
    const handleInputChange = (event) => {
        setNewOpal({
          ...newOpal,
          [event.target.name]: event.target.value,
        });
      };

    const handleCreateOpal = async () => {
        try {
          // Make POST request
            await axios.post(process.env.REACT_APP_BACKEND_URL + 'opals', newOpal, {
                headers: {
                    jwt: jwt,
                },
            });
            // Navigate back to opal page when created
            navigate('/opals');  
            toast.success("New Opal Listing Created!");
        } catch (error) {
          console.error('Error creating opal:', error);
        }
      };

    return (
      <div className="create-container">
        <h1>CREATE NEW OPAL</h1>
        <div>
          <label htmlFor="name" className="create-text"><strong>Name: </strong></label>
          <input
              type="text"
              name="name"
              value={newOpal.name}
              onChange={handleInputChange}
              className="create-input"
          />
        </div>
        <div>
          <label htmlFor="image" className="create-text"><strong>Image: </strong></label>
          <input
              type="text"
              name="image"
              value={newOpal.image}
              onChange={handleInputChange}
              className="create-input"
              placeholder="Enter URL address"
          />
        </div>
        <div>
          <label htmlFor="origin" className="create-text"><strong>Origin: </strong></label>
          <input
              type="text"
              name="origin"
              value={newOpal.origin}
              onChange={handleInputChange}
              className="create-input"
          />
        </div>
        <div>
          <label htmlFor="weight" className="create-text"><strong>Weight: </strong></label>
          <input
              type="number"
              name="weight"
              value={newOpal.weight}
              onChange={handleInputChange}
              className="create-input"
          />
        </div>
        <div>
          <label htmlFor="dimensions" className="create-text"><strong>Dimensions: </strong></label>
          <input
              type="text"
              name="dimensions"
              value={newOpal.dimensions}
              onChange={handleInputChange}
              className="create-input"
          />
        </div>
        <div>
          <label htmlFor="brightness" className="create-text"><strong>Brightness: </strong></label>
          <input
              type="text"
              name="brightness"
              value={newOpal.brightness}
              onChange={handleInputChange}
              className="create-input"
          />
        </div>
        <div>
          <label htmlFor="tone" className="create-text"><strong>Tone: </strong></label>
          <input
              type="text"
              name="tone"
              value={newOpal.tone}
              onChange={handleInputChange}
              className="create-input"
          />
        </div>
        <div>
          <label htmlFor="pricing" className="create-text"><strong>Pricing: </strong></label>
          <input
              type="number"
              name="pricing"
              value={newOpal.pricing}
              onChange={handleInputChange}
              className="create-input"
          />
        </div>
        <div>
          <button onClick={handleCreateOpal} className="create-button">
              Create New Opal
          </button>
        </div>
  </div>
    );
};
    
export default CreateNewOpal;
