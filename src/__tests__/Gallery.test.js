import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import Gallery from '../pages/Gallery';

const mockAxios = new MockAdapter(axios);

// Mock data
const mockOpalsData = [
    {
        _id: '1',
        name: 'Opal 1',
        image: 'opal1.jpg',
        origin: 'Origin 1',
        pricing: 100,
    },
    {
        _id: '2',
        name: 'Opal 2',
        image: 'opal2.jpg',
        origin: 'Origin 2',
        pricing: 150,
    },
];

describe('Gallery Component', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    test('renders loading indicator and fetches opals data', async () => {
        mockAxios.onGet(`${process.env.REACT_APP_BACKEND_URL}opals`).reply(200, { opalsArray: mockOpalsData });

    render(
        <MemoryRouter>
            <Gallery />
        </MemoryRouter>
    );

    // Loading text should be there when data is fetched
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(/Opals/i)).toBeInTheDocument();
        // Once fetched, loading text should not be there
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

        expect(screen.getByText(/Opal 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Opal 2/i)).toBeInTheDocument();
    });

    // it('handles click on "See More" button', async () => {
    //     ockAxios.onGet(`${process.env.REACT_APP_BACKEND_URL}opals`).reply(200, { opalsArray: mockOpalsData });

    // const navigateMock = jest.fn();

    // render(
    //   <MemoryRouter>
    //     <Gallery />
    //   </MemoryRouter>
    // );

    // await waitFor(() => {
    //     const seeMoreButton = screen.getAllByText(/See More/i, { selector: 'button' });
        
    //     // fireEvent on first button
    //     fireEvent.click(seeMoreButton[0]);
    //     });

    //     expect(navigateMock).toHaveBeenCalled(); // Ensure that the navigation function is called
    // // You may need to modify this part based on your navigation testing strategy
    // });
});