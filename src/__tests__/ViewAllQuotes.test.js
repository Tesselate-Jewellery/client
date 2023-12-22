import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ViewAllQuotes from '../pages/ViewAllQuotes';
import axios from 'axios';

// Mocking axios to simulate API requests
jest.mock('axios');

describe('ViewAllQuotes Component', () => {
    test('renders quotes', async () => {
        // Mock the useAuth hook to return the user role
        jest.spyOn(require('../utils/AuthContext'), 'useAuth').mockImplementation(() => ({
            role: 'admin',
            jwt: 'jwt',
            userID: 'mockedUserID',
    }));

    // Mock the data expected from the API
    const mockQuotesData = [
        {
            _id: '1',
            opal: 'opal1',
            metal: '9ct Gold',
            setting: 'claw',
            ringSize: 'O',
            pricing: '1000',
            createdAt: '2023-01-01T12:00:00Z',
        },
    ];

    // Mock the Axios get request to return the mock data
    axios.get.mockResolvedValue({
        data: { quotesArray: mockQuotesData },
    });

    // Render the component
    render(<ViewAllQuotes />);

    // Check if the quotes are rendered
    await waitFor(() => {
        expect(screen.getByText('9ct Gold')).toBeInTheDocument();
        expect(screen.getByText('claw')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
        expect(screen.getByText('O')).toBeInTheDocument();
    });
  });
});