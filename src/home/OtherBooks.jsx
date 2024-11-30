import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';

const OtherBooks = () => {
    const [books, setBooks] = useState([]);
    const baseURL = import.meta.env.VITE_BASE_URL;


    useEffect( () => {
        fetch(`${baseURL}/books/`).then(res => res.json()).then(data => setBooks(data.payload.slice(9,20)))
    }, [])
  return (
    <div>
        <BookCards books={books} headline="New Arrivals"/>
    </div>
  )
}

export default OtherBooks