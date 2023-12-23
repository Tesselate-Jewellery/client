import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home Component', () => {
    test('renders Browse Section', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

    // Check if Browse Section is rendered
    expect(screen.getByText(/Locally sourced Australian Opals/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Browse More/i })).toBeInTheDocument();
  });

  test('renders Meet Your Makers Section', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

    // Check if Meet Your Makers Section is rendered
    expect(screen.getByText(/Meet Aisha/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Learn More/i })).toBeInTheDocument();
  });
});