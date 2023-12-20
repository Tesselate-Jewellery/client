import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { ToastContainer, toast } from "react-toastify";

const EditUser = () => {
    const { user_id } = useParams();
    const { jwt } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}users/${user_id}`,
                    {
                        headers: {
                            jwt: jwt,
                        },
                    }
                );
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [user_id, jwt]);

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSaveClick = async () => {
        try {

            // Add your validation logic here, e.g., checking for @ in the email
            if (!userData.email || !userData.email.includes('@')) {
            // Display a toast error message
                toast.error('Invalid email format. Please enter a valid email.');
                return; // Stop the save process if there's an error
            }
            
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}users/${user_id}`,
                userData,
                {
                    headers: {
                        jwt: jwt,
                    },
                }
            );
            toast.success("User Edited Successfully");
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <h1>Edit Profile</h1>
            <h2>Welcome {userData.username}</h2>
            <label>Username:</label>
            <input
                type="text"
                name="username"
                value={userData.username || ''}
                onChange={handleInputChange}
            />
            <label>Email:</label>
            <input
                type="text"
                name="email"
                value={userData.email || ''}
                onChange={handleInputChange}
            />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => navigate('/dashboard')}>Go Back</button>
        </div>
    );
};

export default EditUser;