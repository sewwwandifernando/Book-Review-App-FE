import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';

const BestSellerBooks = () => {
    const [books, setBooks] = useState([]);
    const baseURL = import.meta.env.VITE_BASE_URL;


    useEffect( () => {
        fetch(`${baseURL}/books/`).then(res => res.json()).then(data => setBooks(data.payload.slice(1,10)))
    }, [])
  return (
    <div>
        <BookCards books={books} headline="Best Seller Books"/>
    </div>
  )
}

export default BestSellerBooks