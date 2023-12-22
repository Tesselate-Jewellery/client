import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import EditOpal from '../pages/EditOpal';

jest.mock('../utils/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('axios');

describe('Edit New Opal Component', () => {
    const renderComponent = async () => {
        // Mock the useAuth hook to return the user role
        jest.spyOn(require('../utils/AuthContext'), 'useAuth').mockImplementation(() => ({
            role: 'admin', 
            jwt: 'jwt',
            userID: 'mockedUserID',
         }));
    
        render(
            <Router>
                <EditOpal />
            </Router>
        );
    };

    test('renders edit new opal form with correct labels (admin)', async () => {
        await renderComponent();
  
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

    describe('Edit New Opal Component', () => {
    const renderComponent = async () => {
            // Mock the useAuth hook to return the user role
            jest.spyOn(require('../utils/AuthContext'), 'useAuth').mockImplementation(() => ({
                role: 'staff', 
                jwt: 'jwt',
                userID: 'mockedUserID',
            }));
      
        render(
            <Router>
                <EditOpal />
            </Router>
        );
    };
  
    test('renders edit new opal form with correct labels (staff)', async () => {
        await renderComponent();
    
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
