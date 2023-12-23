import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for testing
import Footer from '../components/Footer';

test('renders footer text', () => {
  render(
    <Router>
      <Footer />
    </Router>
  );

  expect(screen.getByText(/Tesselate Jewellery/i)).toBeInTheDocument();
  expect(screen.getByText(/Bespoke Opal Rings/i)).toBeInTheDocument();
  expect(screen.getByText(/Every piece is unique and handcrafted/i)).toBeInTheDocument();
});