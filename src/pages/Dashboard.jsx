import React from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const { role, userID } = useAuth();
    const navigate = useNavigate();
    const showAdminDashboard = ["admin"].includes(role);
    const showAdminAndStaffDashboard = ["admin", "staff"].includes(role);

    const handleViewAllOpals = () => {
        navigate('/opals')
    }

    const handleViewAllUsers = () => {
        navigate('/users')
    }

    const handleCreateNewOpal = () => {
        navigate('/create-new-opal')
    }

    const handleEditProfile = () => {
        // Check if userID is available
        if (userID) {
            // Navigate to the EditUser page with the userID as a parameter
            navigate(`/edit-profile/${userID}`);
        } else {
            console.error('UserID is undefined');
        }
    };

    return (
        <div>
            <button onClick={handleEditProfile}>Edit Profile</button>
            {showAdminAndStaffDashboard && (
                <button onClick={handleViewAllOpals}>View All Opals</button>
            )}
            {showAdminDashboard && (
                <div>
                    <button onClick={handleCreateNewOpal}>Create New Opal</button>
                    <button onClick={handleViewAllUsers}>View All Users</button>
                    <button>View All Quotes</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;