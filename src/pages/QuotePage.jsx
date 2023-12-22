import React from 'react';
import { useParams } from 'react-router-dom';

const QuotePage = () => {
    const { calculatedPrice, opalName } = useParams();

    return (
        <div>
            <h2>Thank you for your interest!</h2>
            <p>
                Your quote of ${calculatedPrice} for the {opalName} has been sent to{' '}
                <strong>tesselatejewellery@gmail.com</strong>. We will get back to you within 10 business days.
            </p>
        </div>
    );
};

export default QuotePage;