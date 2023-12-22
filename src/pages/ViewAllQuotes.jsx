import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { toast } from 'react-toastify';

const LoadingIndicator = () => <p>Loading...</p>;

const QuoteDetails = ({ quote, onDelete }) => {
    const { jwt } = useAuth();
    const [createdByUsername, setCreatedByUsername] = useState('');
    const [opalName, setOpalName] = useState('');

    // invokes onDelete passing quote._id as argument
    const handleDeleteClick = () => {
        onDelete(quote._id);
    };

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                // console.log('Fetching username for ID:', quote.createdBy);
                // Make GET request
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users/${quote.createdBy}`, {
                    headers: {
                        jwt: jwt,
                    },
                });

                // console.log(quote.createdBy);
                // console.log('User Response:', response.data);  
                // Display just the username, rather than id
                setCreatedByUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching username', error);
            }
        };

        const fetchOpalName = async () => {
            try {
                // console.log('Fetching opal name for ID:', quote.opal);
                // Make GET request
                let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}opals/${quote.opal}`, {
                    headers: {
                        jwt: jwt,
                    },
                });

                // console.log(quote.opal);
                // console.log('Opal Response:', response.data);
                // Display the opal name, rather than id 
                setOpalName(response.data.name) 
            } catch (error) {
                console.error('Error fetching opal name', error);
            }
        };

        fetchUsername();
        fetchOpalName();
    }, [jwt, quote.createdBy, quote.opal]);

    return (
        <div key={quote._id}>
            {/* username state taken from fetchUsername */}
            <h2>{createdByUsername}</h2>
            {/* opal name state taken from fetchOpalName */}
            <h3>{opalName}</h3>
            <h3>{quote.metal}</h3>
            <h3>{quote.setting}</h3>
            <h3>{quote.ringSize}</h3>
            <h3>{quote.pricing}</h3>
            <h3>{quote.createdAt}</h3>
            <button onClick={handleDeleteClick}>Delete Quote</button>
        </div>
    );
};

const ViewAllQuotes = () => {
    const { jwt } = useAuth();
    const [quotesData, setQuotesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setIsLoading(true);

            // Make GET request
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + 'quotes', {
            headers: {
                jwt: jwt,
            },
            });

            // console.log(response.data);
            setQuotesData(response.data.quotesArray);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
        };

        fetchData();
    }, [jwt]);

    const handleDeleteQuote = async (quoteId) => {
        try {
        // Make a DELETE request to remove the quote
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}quotes/${quoteId}`, {
            headers: {
            jwt: jwt,
            },
        });

        // Filter out the deleted quote from the state
        setQuotesData((prevQuotes) => prevQuotes.filter((quote) => quote._id !== quoteId));
        toast.success('Quote Successfully Removed!');
        } catch (error) {
        console.error('Error deleting quote:', error);
        }
    };

    return (
        <div>
        <h1>Quotes</h1>
        {isLoading ? <LoadingIndicator /> : renderQuotes(quotesData, handleDeleteQuote)}
        </div>
    );
};

// Populate all the quotes
const renderQuotes = (quotesData, onDelete) => {
    if (Array.isArray(quotesData) && quotesData.length > 0) {
        return quotesData.map((quote) => <QuoteDetails key={quote._id} quote={quote} onDelete={onDelete} />);
    } else {
        return <p>No quote data available</p>;
    }
};

export default ViewAllQuotes;