import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { ToastContainer, toast } from "react-toastify";
import "../styling/EditProfile.css";

const LoadingIndicator = () => <p className="loading-indicator">Loading...</p>;

const EditUser = () => {
    const { setAuthenticated } = useAuth();
    const { user_id } = useParams();
    const { jwt } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // Separate states for non-sensitive fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                // Make GET request
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}users/${user_id}`,
                    {
                        headers: {
                            jwt: jwt,
                        },
                    }
                );

                // Set non-sensitive fields
                setUsername(response.data.username || '');
                setEmail(response.data.email || '');
                // Password is intentionally omitted

            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user_id, jwt]);

    const handleInputChange = (event) => {
        // Update the corresponding state based on the input name
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            case 'confirmPassword':
                setConfirmPassword(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleSaveClick = async () => {
        try {
            // Add your validation logic here, e.g., checking for @ in the email
            if (!email || !email.includes('@')) {
                // Display a toast error message
                toast.error('Invalid email format. Please enter a valid email.');
                return; // Stop the save process if there's an error
            }

            // Password in edit must be minimum 6 characters
            if (password.length < 6) {
                toast.error("Password must be at least 6 characters long.");
                return;
            }

             // Check if passwords match
            if (password !== confirmPassword) {
                // Display a toast error message
                toast.error('Passwords do not match. Please re-enter your passwords.');
                return;
            }

            // Make PUT request
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}users/${user_id}`,
                { username, email, password }, 
                {
                    headers: {
                        jwt: jwt,
                    },
                }
            );
            toast.success("User Edited Successfully! Please Log In again");
            // When a user is edited, clear the jwt, role and user ID
            setAuthenticated({ jwt: '', role: '', userID: '' });
            // Navigate back to login page
            navigate("/login")
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    return (
        <div>
            {isLoading ? <LoadingIndicator /> : (
                <>
                    <ToastContainer />
                    <h1>EDIT PROFILE</h1>
                    <h2>Welcome {username}</h2>
                    <div className="profile-container">
                        <div>
                            <label className="profile-label">Username: </label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleInputChange}
                                className="profile-input"
                            />
                        </div>
                        <div>
                            <label className="profile-label">Email: </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                className="profile-input"
                            />
                        </div>
                        <div>
                            <label className="profile-label">Password: </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                className="profile-input"
                            />
                        </div>
                        <div>
                            <label className="profile-label">Confirm Password: </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleInputChange}
                                className="profile-input"
                            />
                        </div>
                        <div>
                            <button onClick={handleSaveClick} className="profile-button">Save</button>
                            <button onClick={() => navigate('/dashboard')} className="profile-button">Go Back</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EditUser;