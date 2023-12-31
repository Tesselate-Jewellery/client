import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import QuotePage from '../pages/QuotePage';

describe('QuotePage component', () => {
  test('renders QuotePage with correct parameters', () => {
    // Make up some values for price and opal name
    const calculatedPrice = '1000';
    const opalName = 'Beautiful Opal';

    render(
      <MemoryRouter initialEntries={[`/quote/${calculatedPrice}/${opalName}`]}>
        <Routes>
          <Route path="/quote/:calculatedPrice/:opalName" element={<QuotePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Write strings of expected text to be on page
    const thankYouHeader = screen.getByText(/Thank you for your interest!/i);
    const priceTextPattern = new RegExp(`Your quote of \\$${calculatedPrice} for the ${opalName} has been sent to`);
    const emailText = screen.getByText(/tesselatejewellery@gmail.com/i);
    const priceText = screen.getByText(priceTextPattern);

    expect(priceText).toBeInTheDocument();
    expect(thankYouHeader).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
  });
});