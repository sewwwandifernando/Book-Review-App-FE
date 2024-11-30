import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react";

const EditBook = () => {

    const baseURL = import.meta.env.VITE_BASE_URL;

    const { id } = useParams(); // Get the book id from the URL params
    const [book, setBook] = useState(null); // State to store the fetched book data
    const [loading, setLoading] = useState(true); // State to handle loading

    const bookCategories = [
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Programming",
        "Science Fiction",
        "Horror",
        "Bibliograpgy",
        "Autobiography",
        "History",
        "Manga",
        "Self-help",
        "Memoir",
        "Children Books",
        "Travel",
        "Religion",
        "Art and Design"
    ]

    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

    useEffect(() => {
        // Fetch book data by id
        fetch(`${baseURL}/books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data.payload); // Set book data from the response payload
                setLoading(false); // Stop loading when the data is fetched
                setSelectedBookCategory(data.payload.category)
            })
            .catch(error => {
                console.error("Error fetching book data:", error);
                setLoading(false);
            });
    }, [id]);
    

    

    const handleChangeSelectedValue = (event) => {
        setSelectedBookCategory(event.target.value);
    }

    //handle book submission
    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;

        const bookTitle = form.bookTitle.value;
        const autherName = form.autherName.value;
        const imageURL = form.imageURL.value;
        const category = form.categoryName.value;
        const bookDiscription = form.bookDiscription.value;
        const bookPDFURL = form.bookPDFURL.value;

        const updatedBookObj = {
            bookTitle, autherName, imageURL, category, bookDiscription, bookPDFURL 
        }

        const token = localStorage.getItem('token')

        fetch(`${baseURL}/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedBookObj)
        }).then(res => res.json()).then(data => {
            alert("Book Updated Successfully!!!");
        })

    }

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    if (!book) {
        return <div>Book data could not be loaded</div>; // Handle error case
    }
  return (
    <div className='px-4 my-12'>
        <h2 className='mb-8 text-3xl font-bold'>Update Book</h2>

        <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
            {/* first row */}
            <div className='flex gap-8'>
                <div className='lg:w-1/2'>
                    <div className="mb-2 block">
                        <Label htmlFor="bookTitle" value="Book Title" />
                    </div>
                    <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book title" defaultValue={book.bookTitle} required />
                </div>
                <div className='lg:w-1/2'>
                    <div className="mb-2 block">
                        <Label htmlFor="autherName" value="Author Name" />
                    </div>
                    <TextInput id="autherName" name='autherName' type="text" placeholder="Author name" defaultValue={book.autherName} required />
                </div>

            </div>

            {/* second row */}
            <div className='flex gap-8'>
                <div className='lg:w-1/2'>
                    <div className="mb-2 block">
                        <Label htmlFor="imageURL" value="Book Image URL" />
                    </div>
                    <TextInput id="imageURL" name='imageURL' type="text" placeholder="Book image URL" defaultValue={book.imageURL} required />
                </div>
                <div className='lg:w-1/2'>
                    <div className="mb-2 block">
                        <Label htmlFor="inputState" value="Book Category" />
                    </div>
                    <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
                        {
                            bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
                        }
                    </Select>
                </div>

            </div>

            {/* book description */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="bookDiscription" value="Book Discription" />
                </div>
                <Textarea className='w-full' id="bookDiscription" name='bookDiscription' placeholder="Write your book discription..." required rows={5} defaultValue={book.bookDiscription} />
            </div>

            {/* book pdf url */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="bookPDFURL" value="Book PDF URL" />
                </div>
                <TextInput id="bookPDFURL" name='bookPDFURL' type="text" placeholder="Book PDF URL" defaultValue={book.bookPDFURL} required />
            </div>

            <Button type="submit" className='mt-5'>Update Book</Button>

        </form>
        
    </div>
  )
}

export default EditBook