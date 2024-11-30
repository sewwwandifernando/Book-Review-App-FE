import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AddReviewModal from '../components/AddReviewModal';
import { AuthContext } from '../context/AuthProvider';


const SingleBook = () => {
    const { id } = useParams(); // Get the book id from the URL params
    const [book, setBook] = useState(null); // State to store the fetched book data
    const [reviews, setReviews] = useState([]); //State to store reviews
    const [loading, setLoading] = useState(true); // State to handle loading
    const [avgRating, setAvgRating] = useState("N/A")
    const { user } = useContext(AuthContext)

    const reviewsRef = useRef(null);

    const [value, setValue] = useState(null)

    const baseURL = import.meta.env.VITE_BASE_URL;


    useEffect(() => {
        // Fetch book data by id
        fetch(`${baseURL}/books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data.payload); // Set book data from the response payload
                setLoading(false); // Stop loading when the data is fetched
            })
            .catch(error => {
                console.error("Error fetching book data:", error);
                setLoading(false);
            });

        // Fetch ratings and reviews for the book
        fetch(`${baseURL}/ratings/${id}`)
            .then(res => res.json())
            .then(data => {
                setReviews(data.payload); // Set reviews data from the response payload
            })
            .catch(error => {
                console.error("Error fetching ratings and reviews:", error);
            });
        
        // Fetch average rating of the book
        fetch(`${baseURL}/ratings/avgRating/${id}`)
            .then(res => res.json())
            .then(data => {
                setAvgRating(data.payload)
            })
            .catch(error => {
                console.log("Error fetching average rating:", error)
            })
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    // Function to scroll to the reviews section
    const scrollToReviews = () => {
        if (reviewsRef.current) {
            reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='font-serif flex p-0 mt-32 w-5/6 mx-auto my-auto bg-white items-stretch justify-center'>
            <div className='flex flex-col mx-0 px-2 w-1/3 max-w-[428px] items-center'>
                <img 
                    src={book.imageURL} 
                    alt={book.bookTitle} 
                    className='object-cover w-1/2 rounded-lg shadow-md mb-4'
                />
                <button className='bg-blue-700 w-3/4 mb-3 text-white font-semibold py-2 rounded-3xl mt-4 hover:bg-black transition-all duration-100'>
                    <a 
                        href={book.bookPDFURL} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='w-full' 
                    >
                        Read Now
                    </a>
                </button>
                <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        size="large"
                /></Box>
            </div>
            <div className='mx-0 px-4 w-2/3'>
                <h2 className='text-4xl mb-2'>{book.bookTitle}</h2>
                <div className='flex mb-2'>
                    <p className='text-gray-700 text-xl'>{book.autherName}</p>
                    <svg className="w-5 h-5 text-yellow-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clipRule="evenodd"/>
                    </svg>
                </div>
                <button className='rounded-lg hover:bg-gray-100' onClick={scrollToReviews}>
                    <div className='flex p-3 pl-0 pr-0'>
                        <Rating name="half-rating-read" value={avgRating} precision={0.1} readOnly size="large" />
                        <p className='text-2xl mx-2'>{Number(avgRating).toFixed(1)}</p>
                    </div>
                </button>
                
                
                
                <p className='mt-2 mb-2'>{book.bookDiscription}</p>
                <p className='text-gray-500 text-sm mt-8 mb-4'  >Genre <span className='text-black text-base mx-2 underline'>{book.category}</span></p>
                <p className='text-gray-500 text-sm mb-2'  >336 pages, Hardcover </p>
                <p className='text-gray-500 text-sm'  >First published May 16, 2023 </p>
                <br></br>
                
                <hr></hr>
                <br></br>
                {/* Review section */}
                <div ref={reviewsRef}>
                    <div className='text-3xl'><h2>Ratings & Reviews</h2></div>
                    <div className='py-3'>
                        <div className='flex justify-center mb-4'>
                            <div className='h-14 w-14 bg-grey rounded-full flex justify-center content-center items-center'>
                            <svg className="w-9 h-9 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clipRule="evenodd"/>
                            </svg>
                            </div>
                        </div>
                        <div className='text-4xl flex justify-center mb-4'>
                            <h2>What do you think?</h2>
                        </div>
                        <div className='flex justify-center'>
                            <div className='flex flex-col content-center items-center mx-2'>
                                <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                />
                                <Typography component="legend">Rate this book</Typography>
                            </div>
                            {/* <button className='bg-black text-white rounded-3xl w-1/5 min-w-32 max-w-40 mx-2 py-0'>Write a Review</button> */}
                            <AddReviewModal bookId={id} userId={user?.id}/>
                        </div>
                    </div>
                    <br/>
                    <hr/>
                    <br/>
                    <div className='text-lg'><h2>Community Reviews</h2></div>
                    <div className='mt-4'>
                        {reviews.length === 0 ? (
                            <p>No reviews yet.</p>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={index} className='mb-4'>
                                    <div className='flex items-center'>
                                        <h3 className='font-semibold'>{review.User.name} ({review.User.username})</h3>
                                        <Rating name="read-only" value={review.ratings} readOnly />
                                    </div>
                                    <p>{review.reviews}</p>
                                </div>
                            ))
                        )}
                    </div>

                </div>
                
            </div>
            
            
        </div>
    );
};

export default SingleBook;
