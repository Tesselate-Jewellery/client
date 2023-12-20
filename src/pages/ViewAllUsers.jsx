import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { toast } from "react-toastify";

const LoadingIndicator = () => <p>Loading...</p>;

const UserDetails = ({ user, onDelete }) => {

    const handleDeleteClick = () => {
        // Call the onDelete function passed from the parent component
        onDelete(user._id);
    };

    return (
        <div key={user._id}>
            <h2>{user.email}</h2>
            <h2>{user.username}</h2>
            <button onClick={handleDeleteClick}>Delete User</button>
        </div>
    );
};

const ViewAllUsers = () => {
    const { jwt } = useAuth();
    const [usersData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
        const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + 'users', {
            headers: {
                jwt: jwt,
            },
            });

            console.log(response.data);
            setUserData(response.data.usersArray);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
        };
        fetchData();
    }, [jwt]);

    // Function to handle user deletion
    const handleDeleteUser = async (userId) => {
        try {
        // Make a DELETE request to remove the user
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}users/${userId}`, {
            headers: {
            jwt: jwt,
            },
        });

        // Filter out the deleted user from the state
        setUserData((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            toast.success("User Successfully Removed!")
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
        <h1>Users</h1>
        {isLoading ? <LoadingIndicator /> : renderUsers(usersData, handleDeleteUser)}
        </div>
    );
};

const renderUsers = (usersData, onDelete) => {
    if (Array.isArray(usersData) && usersData.length > 0) {
        return usersData.map((user) => <UserDetails key={user._id} user={user} onDelete={onDelete} />);
    } else {
        return <p>No users data available</p>;
    }
};

export default ViewAllUsers;