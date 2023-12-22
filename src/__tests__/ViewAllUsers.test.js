import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ViewAllUsers from '../pages/ViewAllUsers';
import axios from 'axios';

// Mocking axios to simulate API requests
jest.mock('axios');

describe('ViewAllUsers Component', () => {
  test('renders users', async () => {
    // Mock the useAuth hook to return the user role
    jest.spyOn(require('../utils/AuthContext'), 'useAuth').mockImplementation(() => ({
      role: 'admin', 
      jwt: 'jwt',
      userID: 'mockedUserID',
    }));

    // Mock the data you expect to receive from the API
    const mockUsersData = [
      {
        _id: '1',
        email: 'user1@example.com',
        username: 'user1',
      },
      // Add more mock users as needed
    ];

    // Mock the Axios get request to return the mock data
    axios.get.mockResolvedValue({
      data: { usersArray: mockUsersData },
    });

    // Render the component
    render(<ViewAllUsers />);

    // Check if the users are rendered
    await waitFor(() => {
      expect(screen.getByText('user1@example.com')).toBeInTheDocument();
      expect(screen.getByText('user1')).toBeInTheDocument();
      // You can add more assertions for other elements as needed
    });
  });
});