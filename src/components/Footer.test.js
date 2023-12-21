import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for testing
import Footer from './Footer';

test('renders footer text', () => {
  render(
    <Router>
      <Footer />
    </Router>
  );

  expect(screen.getByText(/Tesselate Jewellery/i)).toBeInTheDocument();
  expect(screen.getByText(/Bespoke Opal Rings/i)).toBeInTheDocument();
  expect(screen.getByText(/Handcrafted with attention to the finest details./i)).toBeInTheDocument();
});