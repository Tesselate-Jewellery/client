import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const LoadingIndicator = () => <p>Loading...</p>;

const OpalDetails = ({ opal, onDelete }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    // Navigate to the edit page with the opal ID as a parameter
    navigate(`/edit-opal/${opal._id}`);
  };

  // Invokes onDelete passing opal._id as argument
  const handleDeleteClick = () => {
    onDelete(opal._id);
  };

  return (
    <div key={opal._id}>
      <h2>{opal.name}</h2>
      <h3>{opal.image}</h3>
      <h3>{opal.origin}</h3>
      <h3>{opal.weight}</h3>
      <h3>{opal.dimensions}</h3>
      <h3>{opal.brightness}</h3>
      <h3>{opal.tone}</h3>
      <h3>{opal.pricing}</h3>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
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
      <h1>Opals</h1>
      {isLoading ? <LoadingIndicator /> : renderOpals(opalsData, handleDeleteOpal)}
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