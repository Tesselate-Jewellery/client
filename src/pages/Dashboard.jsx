import React from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const showAdminDashboard = ["admin"].includes(role);

    const handleViewAllOpals = () => {
        navigate('/opals')
    }

    return (
        <div>
            <button onClick={handleViewAllOpals}>View All Opals</button>
            {showAdminDashboard && (
                <div>
                    <button>Create New Opal</button>
                    <button>View All Users</button>
                    <button>View All Quotes</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;