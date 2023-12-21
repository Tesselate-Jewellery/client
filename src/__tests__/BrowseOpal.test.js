import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import BrowseOpal from '../pages/BrowseOpal';
import { useAuth } from '../utils/AuthContext';

// Mock the useAuth hook
jest.mock('../utils/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock axios for API calls
jest.mock('axios');

describe('BrowseOpal Component', () => {
  // Helper function to render the component
  const renderComponent = () => {
    // Mock the useAuth hook to return the mocked context values
    useAuth.mockReturnValue({ jwt: 'mockedJWT' });

    // Mock the axios.get method to return data for the opal
    axios.get.mockResolvedValue({
      data: {
        name: 'Mocked Opal',
        image: 'path/to/image.jpg',
        origin: 'Mocked Origin',
        weight: 'Mocked Weight',
        dimensions: 'Mocked Dimensions',
        brightness: 'Mocked Brightness',
        tone: 'Mocked Tone',
        pricing: 100, // Mocked pricing value
      },
    });

    render(
      <Router>
        <BrowseOpal />
      </Router>
    );
  };

  test('renders opal details', async () => {
    renderComponent();

    // Check if the opal details are rendered
    expect(await screen.findByText('Mocked Opal')).toBeInTheDocument();
    expect(screen.getByText('Mocked Origin')).toBeInTheDocument();
    expect(screen.getByText('Mocked Weight')).toBeInTheDocument();
    expect(screen.getByText('Mocked Dimensions')).toBeInTheDocument();
    expect(screen.getByText('Mocked Brightness')).toBeInTheDocument();
    expect(screen.getByText('Mocked Tone')).toBeInTheDocument();
    
    // Use queryAllByText for all elements containing "$100"
    const elementsWithPrice = screen.queryAllByText('$100');
    expect(elementsWithPrice.length).toBeGreaterThan(1); 
  });

  test('When "Send Quote" button on click, expect a POST response to be called', async () => {
    renderComponent();

    // Mock the axios.post method to return a successful response when sending a quote
    const axiosPostMock = jest.spyOn(axios, 'post').mockResolvedValue({});

    // Wrap the interaction in act
    await act(async () => {
      // Click the "Send Quote" button
      fireEvent.click(screen.getByText('Send Quote'));
    });

    // Check if the axios.post mock function was called
    expect(axiosPostMock).toHaveBeenCalled();
  });
});