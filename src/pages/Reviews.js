// Reviews.jsx
import React, { useEffect, useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch reviews on component mount
    fetchReviews(currentPage);
  }, [currentPage]);

  const fetchReviews = async (page) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_PATH}/review?skip=${(page - 1) * 10}&limit=10`,
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
    //   console.log("data======>",JSON.stringify(data))
      setReviews(data);
      setTotalPages(Math.ceil(data.total / 10)); // Assuming 10 items per page
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this review?');

    if (!shouldDelete) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_PATH}/review/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      // Refresh reviews after deletion
      fetchReviews(currentPage);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Reviews CRUD Page</h1>

        {/* Table */}
        <div className="overflow-x-auto max-h-[550px]">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">Overall Rating</th>
                <th className="py-2 px-4 border-b">Reviewer Name</th>
                <th className="py-2 px-4 border-b">Review Time</th>
                <th className="py-2 px-4 border-b">Summary</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td className="py-2 px-4 border-b">{review.overall}</td>
                  <td className="py-2 px-4 border-b">{review.reviewerName}</td>
                  <td className="py-2 px-4 border-b">{review.reviewTime}</td>
                  <td className="py-2 px-4 border-b">{review.summary}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-800">
            Page {currentPage}
          </span>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
