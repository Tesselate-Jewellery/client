import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
const LoadingIndicator = () => <p>Loading...</p>;

const UserDetails = ({ user }) => {

    return (
        <div key={user._id}>
            <h2>{user.email}</h2>
            <h2>{user.username}</h2>
        </div>
    );
};

const ViewAllUsers = () => {
    const { jwt } = useAuth();
    const [usersData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
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

    return (
        <div>
            <h1>Users</h1>
            {isLoading ? <LoadingIndicator /> : renderUsers(usersData)}
        </div>
    );
};

const renderUsers = (usersData) => {
    if (Array.isArray(usersData) && usersData.length > 0) {
        return usersData.map((user) => <UserDetails user={user} />)
    } else {
        return <p>No users data available</p>;
    }
};

export default ViewAllUsers;