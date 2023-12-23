import React from 'react';
import { useParams } from 'react-router-dom';
import '../styling/QuotePage.css';

const QuotePage = () => {
    // Extracts calculatedPrice, opalName parameters from object returned
    // route is "/thank-you/:calculatedPrice/:opalName"
    const { calculatedPrice, opalName } = useParams();

    return (
        <div>
            <h2 className="quote-thankyou">Thank you for your interest!</h2>
            <p className="quote-text">
                {/* Will display the price and name of opal based off params */}
                Your quote of <strong>${calculatedPrice}</strong> for the <strong><em>{opalName}</em></strong> has been sent to{' '}
                <strong>tesselatejewellery@gmail.com</strong>. We will get back to you within 10 business days.
            </p>
        </div>
    );
};

export default QuotePage;