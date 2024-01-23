// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import ReviewsScatterPlot from '../components/ReviewsScatterPlot';
import ReviewsPieChart from '../components/ReviewsPieChart';
// import ReviewsHeatmap from '../components/ReviewsHeatmap';

const Dashboard = () => {
    const [reviews, setReviews] = useState( [] );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [totalPages, setTotalPages] = useState( 1 );

    useEffect( () => {
        // Fetch reviews on component mount
        fetchReviews( currentPage );
    }, [currentPage] );

    const fetchReviews = async ( page ) => {
        try {
            const token = localStorage.getItem( 'token' );
            const response = await fetch(
                `${ process.env.REACT_APP_API_BASE_PATH }/review?skip=${ ( page - 1 ) * 10 }&limit=500`,
                {
                    headers: {
                        Authorization: `${ token }`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if ( !response.ok ) {
                throw new Error( 'Failed to fetch reviews' );
            }

            const data = await response.json();
            setReviews( data );
            setTotalPages( Math.ceil( data.total / 10 ) ); // Assuming 10 items per page
        } catch ( error ) {
            console.error( error.message );
        }
    };
    return (
        <div className="bg-gray-200 min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {reviews.length ? (
                <div className="bg-white-300 p-8">
                    <h1>Rating Data</h1>
                    <ReviewsPieChart data={reviews} />
                </div>
            ) : null}
        </div>
    );
};

export default Dashboard;
