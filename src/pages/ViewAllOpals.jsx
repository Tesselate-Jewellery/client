import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import '../styling/ViewAllOpals.css';

const LoadingIndicator = () => <p className="loading-indicator">Loading...</p>;

const OpalDetails = ({ opal, onDelete }) => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const showAdminDashboard = ["admin"].includes(role);

  const handleEditClick = () => {
    // Navigate to the edit page with the opal ID as a parameter
    navigate(`/edit-opal/${opal._id}`);
  };

  // Invokes onDelete passing opal._id as argument
  const handleDeleteClick = () => {
    onDelete(opal._id);
  };

  return (
    <div className="dash-opal-container" key={opal._id}>
      <p className="dash-opal-name">{opal.name}</p>
      <img src={opal.image} alt={`Opal named ${opal.name}`} className="dash-opal-img"/>
      <p className="dash-opal-text">{opal.origin}</p>
      <p className="dash-opal-text"><strong>Weight:</strong> {opal.weight}</p>
      <p className="dash-opal-text"><strong>Dimensions:</strong> {opal.dimensions}</p>
      <p className="dash-opal-text"><strong>Brightness:</strong> {opal.brightness}</p>
      <p className="dash-opal-text"><strong>Tone:</strong> {opal.tone}</p>
      <p className="dash-opal-text"><strong>Price:</strong> {opal.pricing}</p>
      <button onClick={handleEditClick} className="dash-opal-button">Edit</button>
      {/* Only show delete button to Admin */}
      {showAdminDashboard && (
      <button onClick={handleDeleteClick} className="dash-opal-button">Delete</button>
      )}
    </div>
  );
};

const ViewAllOpals = () => {
  const { jwt } = useAuth();
  const [opalsData, setOpalsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading state
        setIsLoading(true);

        // Make GET request
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + 'opals', {
          headers: {
            jwt: jwt,
          },
        });

        // console.log(response.data);
        setOpalsData(response.data.opalsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jwt]);

  // Function to handle delete opal
  const handleDeleteOpal = async (opalId) => {
    try {
      console.log('Deleting opal:', opalId);
      // Make DELETE request
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}opals/${opalId}`, {
        headers: {
          jwt: jwt,
        },
      });
  
      // Filter out the deleted opals from the state and display list without deleted opal
      setOpalsData((prevOpals) => prevOpals.filter((opal) => opal._id !== opalId));
      toast.success("Opal Successfully Removed!");
    } catch (error) {
      console.error('Error deleting opal:', error);
    }
  };

  return (
    <div>
      <h1>LIST OF ALL OPALS</h1>
      <div className="opal-gallery">{isLoading ? <LoadingIndicator /> : renderOpals(opalsData, handleDeleteOpal)}</div>
    </div>
  );
};

const renderOpals = (opalsData, onDelete) => {
  if (Array.isArray(opalsData) && opalsData.length > 0) {
    return opalsData.map((opal) => <OpalDetails key={opal._id} opal={opal} onDelete={onDelete} />);
  } else {
    return <p>No opals data available</p>;
  }
};

export default ViewAllOpals;