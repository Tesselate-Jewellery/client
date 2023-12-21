import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../utils/AuthContext';

// Mock the useAuth hook
jest.mock('../utils/AuthContext', () => ({
    useAuth: jest.fn(),
    }));

describe('Header Component', () => {
    test('renders "Logout" when JWT is present', () => {
        // Set up the mocked context values
        const mockAuthContext = {
            jwt: 'mockedJWT', // Add any other necessary values
            setAuthenticated: jest.fn(),
        };

        // Mock the useAuth hook to return the mocked context values
        useAuth.mockReturnValue(mockAuthContext);

        render(
            <Router>
                <Header />
            </Router>
        );

        const logoutButton = screen.getByText("Logout");
        expect(logoutButton).toBeInTheDocument();
    });

    test('calls setAuthenticated with empty values when "Logout" button is clicked', () => {
        // Set up the mocked context values
        const mockAuthContext = {
            jwt: 'mockedJWT', // Add any other necessary values
            setAuthenticated: jest.fn(),
        };

        // Mock the useAuth hook to return the mocked context values
        useAuth.mockReturnValue(mockAuthContext);

        render(
            <Router>
                <Header />
            </Router>
        );

        const logoutButton = screen.getByText("Logout");

        // Simulate click on logout button
        fireEvent.click(logoutButton);

        expect(mockAuthContext.setAuthenticated)
        .toHaveBeenCalledWith(
            { jwt: '', role: '', userID: '' }
        );
    });
});