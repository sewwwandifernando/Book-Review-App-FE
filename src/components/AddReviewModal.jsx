import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddReviewModal = ({ bookId, userId }) => {

  const baseURL = import.meta.env.VITE_BASE_URL;


  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleOpenModal = () => {
    // Check if the user is logged in by verifying the token
    if (!token) {
      // If no token, redirect to login page
      navigate('/login', { state: { from: window.location.pathname } });
    } else {
      // If token exists, show the modal
      setShowModal(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!rating || !review) {
      setError('Please provide both a rating and a review.');
      return;
    }

    const reviewData = {
      ratings: rating,
      reviews: review,
      bookId: bookId,
      userId: userId
    };

    try {
        const response = await axios.post(
          `${baseURL}/ratings/`, 
          reviewData,
          {
            headers: {
              "Authorization": `Bearer ${token}`, // Add the token in the Authorization header
            },
          }
        );
      
        if (response.data.error) {
          setError('Error submitting review.');
        } else {
          alert('Review submitted successfully!');
          setShowModal(false); // Close the modal after successful submission
        }
      } catch (err) {
        console.log(err)
        setError('You have aleady rated');
      }
      
  };

  return (
    <>
      <button
        className="bg-black text-white rounded-3xl w-1/5 min-w-32 max-w-40 mx-2 py-0 hover:bg-opacity-70"
        type="button"
        onClick={handleOpenModal}
      >
        Write a Review
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Your Review
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                        Rating (1-5)
                      </label>
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
                        Review
                      </label>
                      <textarea
                        id="review"
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex items-center justify-between">
                      <button
                        className="bg-emerald-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Submit Review
                      </button>
                      <button
                        className="text-red-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddReviewModal;
