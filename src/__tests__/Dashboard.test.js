import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../utils/AuthContext';
import Dashboard from '../pages/Dashboard';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Dashboard Component', () => {
    test('renders buttons based on admin role', () => {
        // Mock the useAuth hook to return the user role
        jest.spyOn(require('../utils/AuthContext'), 'useAuth').mockImplementation(() => ({
            role: 'admin', 
            userID: 'mockedUserID',
        }));

        render(
            <Router >
                <AuthProvider>
                    <Dashboard />
                </AuthProvider>
            </Router>
        );

        // Check if the "Edit Profile" button is rendered
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
        // Check if the "View All Opals" button is rendered for admin and staff
        expect(screen.getByText('View All Opals')).toBeInTheDocument();
        // Check if the "Create New Opal" button is rendered for admin
        expect(screen.getByText('Create New Opal')).toBeInTheDocument();
        // Check if the "View All Users" button is rendered for admin
        expect(screen.getByText('View All Users')).toBeInTheDocument();
        // Check if the "View All Quotes" button is rendered for admin
        expect(screen.getByText('View All Quotes')).toBeInTheDocument();
  });

  test('renders buttons based on staff role', () => {
    // Mock the useAuth hook to return the user role
    jest.spyOn(require('../utils/AuthContext'), 'useAuth').mockImplementation(() => ({
        role: 'staff', 
        userID: 'mockedUserID',
    }));

    render(
        <Router >
            <AuthProvider>
                <Dashboard />
            </AuthProvider>
        </Router>
    );

    // Check if the "Edit Profile" button is rendered
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    // Check if the "View All Opals" button is rendered for admin and staff
    expect(screen.getByText('View All Opals')).toBeInTheDocument();

    });

    test('renders buttons based on user role', () => {
        // Mock the useAuth hook to return the user role
        jest.spyOn(require('../utils/AuthContext'), 'useAuth').mockImplementation(() => ({
            role: 'user', 
            userID: 'mockedUserID',
        }));
    
        render(
            <Router >
                <AuthProvider>
                    <Dashboard />
                </AuthProvider>
            </Router>
        );
    
        // Check if the "Edit Profile" button is rendered
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();

    });
});
