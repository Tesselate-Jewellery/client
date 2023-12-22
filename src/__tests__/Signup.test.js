import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../pages/Signup';

// Check whether all Signup components are rendered correctly
describe('Signup Component', () => {
  test('Check all components render without crashing', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
  });
});