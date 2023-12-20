import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { ToastContainer, toast } from "react-toastify";

const EditUser = () => {
    const { user_id } = useParams();
    const { jwt } = useAuth();
    const navigate = useNavigate();

    // Separate states for non-sensitive fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

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

                // Set non-sensitive fields
                setUsername(response.data.username || '');
                setEmail(response.data.email || '');
                // Password is intentionally omitted

            } catch (error) {
                console.error('Error fetching user data:', error);
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

             // Check if passwords match
            if (password !== confirmPassword) {
                // Display a toast error message
                toast.error('Passwords do not match. Please re-enter your passwords.');
                setPasswordsMatch(false);
                return;
            }

            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}users/${user_id}`,
                { username, email, password }, 
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
            <h2>Welcome {username}</h2>
            <label>Username:</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
            />
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
            />
            <label>Confirm Password:</label>
            <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
            />
            {!passwordsMatch && (
                <p style={{ color: 'red' }}>Passwords do not match. Please re-enter your passwords.</p>
            )}
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => navigate('/dashboard')}>Go Back</button>
        </div>
    );
};

export default EditUser;