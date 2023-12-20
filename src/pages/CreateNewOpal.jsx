import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

    const handleInputChange = (event) => {
        setNewOpal({
          ...newOpal,
          [event.target.name]: event.target.value,
        });
      };

    const handleCreateOpal = async () => {
        try {
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
        <div>
            <h1>Create New Opal</h1>
            <label>Name:</label>
            <input type="text" name="name" value={newOpal.name} onChange={handleInputChange} />
            <label>Image:</label>
            <input type="text" name="image" value={newOpal.image} onChange={handleInputChange} />
            <label>Origin:</label>
            <input type="text" name="origin" value={newOpal.origin} onChange={handleInputChange} />
            <label>Weight:</label>
            <input type="number" name="weight" value={newOpal.weight} onChange={handleInputChange} />
            <label>Dimensions:</label>
            <input type="text" name="dimensions" value={newOpal.dimensions} onChange={handleInputChange} />
            <label>Brightness:</label>
            <input type="text" name="brightness" value={newOpal.brightness} onChange={handleInputChange} />
            <label>Tone:</label>
            <input type="text" name="tone" value={newOpal.tone} onChange={handleInputChange} />
            <label>Pricing:</label>
            <input type="number" name="pricing" value={newOpal.pricing} onChange={handleInputChange} />
            
            <button onClick={handleCreateOpal}>Create New Opal</button>
        
        </div>
    );
};
    
export default CreateNewOpal;
