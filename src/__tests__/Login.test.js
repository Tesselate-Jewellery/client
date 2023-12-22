import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login'; 

// Mocking Axios post method
jest.mock('axios');

// Mock the useAuth hook
jest.mock('../utils/AuthContext', () => ({
    useAuth: jest.fn(),
}));

describe('Login Component', () => {
    test('calls login_user function on button click', async () => {
        const mockedSetAuthenticated = jest.fn();
        const mockedNavigate = jest.fn();

        // Mock the return value of useAuth
        require('../utils/AuthContext').useAuth.mockReturnValue({
            setAuthenticated: mockedSetAuthenticated,
        });

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedNavigate,
    }));

    // Mock the Axios post method
    axios.post.mockResolvedValueOnce({
        data: {
            jwt: 'mockedToken',
            role: 'user',
            userID: 'mockedUserID',
        },
    });

    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    // Click the submit button
    act(() => {
        fireEvent.click(screen.getByText(/Login/i));
    });

    // Wait for asynchronous operations to complete
    await waitFor(() => {});

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BACKEND_URL}users/sign-in`,
        {
            email: 'test@example.com',
            password: 'password123',
        }
    );

    expect(mockedSetAuthenticated).toHaveBeenCalledWith({
        jwt: 'mockedToken',
        role: 'user',
        userID: 'mockedUserID',
    });

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  
    });
});