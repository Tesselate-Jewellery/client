import React from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styling/Dashboard.css';

const Dashboard = () => {
    const { role, userID } = useAuth();
    const navigate = useNavigate();
    // Role handling to render components based off role
    // If role includes "admin"
    const showAdminDashboard = ["admin"].includes(role);
    // If role includes "staff" or "admin"
    const showAdminAndStaffDashboard = ["admin", "staff"].includes(role);

    const handleViewAllOpals = () => {
        navigate('/opals')
    }

    const handleViewAllUsers = () => {
        navigate('/users')
    }

    const handleViewAllQuotes = () => {
        navigate('/quotes')
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
            <h1 className="dashboard-title">WHAT WOULD YOU LIKE TO DO?</h1>
            <div className="dashboard-container">  
                <div>
                    <button onClick={handleEditProfile} className="dashboard-button">Edit Profile</button>
                </div>
                <div className="dashboard-button-container">
                    {showAdminAndStaffDashboard && (
                        <button onClick={handleViewAllOpals} className="dashboard-button">View All Opals</button>
                    )}
                    {showAdminDashboard && (
                        <>
                            <div>
                                <button onClick={handleCreateNewOpal} className="dashboard-button">Create New Opal</button>
                            </div>
                            <div>
                                <button onClick={handleViewAllUsers} className="dashboard-button">View All Users</button>
                            </div>
                            <div>
                                <button onClick={handleViewAllQuotes} className="dashboard-button">View All Quotes</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;