import React from 'react';
import { render, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../utils/AuthContext';
import ViewAllOpals from '../pages/ViewAllOpals';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ViewAllOpals Component', () => {
    test('renders edit button', async () => {
      // Mock the useAuth hook to return the user role
      jest.spyOn(require('../utils/AuthContext'), 'useAuth').mockImplementation(() => ({
        role: 'admin',
        jwt: 'mockedjwt',
        userID: 'mockedUserID',
      }));
  
      render(
        <Router>
          <AuthProvider>
            <ViewAllOpals />
          </AuthProvider>
        </Router>
      );
  
      await waitFor(() => {
        // Check if the "No opals data available" message is rendered
        const noDataMessage = screen.getByText(/No opals data available/i);
        expect(noDataMessage).toBeInTheDocument();
      });
    });
  });