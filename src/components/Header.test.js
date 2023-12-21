import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../utils/AuthContext';

// Mock the useAuth hook
jest.mock('../utils/AuthContext', () => ({
  useAuth: jest.fn(),
}));

test('When user is logged in, the "login" link changes to "Logout', () => {
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

  const loginButton = screen.getByText("Logout");
  expect(loginButton).toBeInTheDocument();
});