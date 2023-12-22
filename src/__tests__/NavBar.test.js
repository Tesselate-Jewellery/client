import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for testing
import NavBar from '../components/NavBar';

test('renders navigation links', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );
    
    // Expect these text strings to be in document
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/gallery/i)).toBeInTheDocument();
    expect(screen.getByText(/faq/i)).toBeInTheDocument();
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});