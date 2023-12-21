import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import CreateNewOpal from '../pages/CreateNewOpal';

// Mock the useAuth hook
jest.mock('../utils/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock axios for API calls
jest.mock('axios');

describe('CreateNewOpal Component', () => {
  // Helper function to render the component
  const renderComponent = () => {
    // Mock the useAuth hook to return the mocked context values
    useAuth.mockReturnValue({ jwt: 'mockedJWT' });

    render(
      <Router>
        <CreateNewOpal />
      </Router>
    );
  };

  test('renders create new opal form with correct labels', async () => {
    renderComponent();
  
    // Check if the form elements are rendered
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Image/i)).toBeInTheDocument();
    expect(screen.getByText(/Origin/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight/i)).toBeInTheDocument();
    expect(screen.getByText(/Dimensions/i)).toBeInTheDocument();
    expect(screen.getByText(/Brightness/i)).toBeInTheDocument();
    expect(screen.getByText(/Tone/i)).toBeInTheDocument();
    expect(screen.getByText(/Pricing/i)).toBeInTheDocument();
  });
});