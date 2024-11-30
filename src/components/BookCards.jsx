import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaCartShopping, FaHeart } from 'react-icons/fa6';

const BookCards = ({headline, books}) => {

  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-5xl text-center font-bold text-black my-10'>{headline}</h2>

      {/* cards */}
      <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper w-full h-full"
      > 
        {
          books.map(book => <SwiperSlide key={book.id}>
            <Link to={`/book/${book.id}`}>
                <div className='relative w-64'>
                  <img src={book.imageURL} alt="" className='h-96 w-64 cover'/>
                  <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'>
                    <FaHeart className='w-4 h-4 text-white'/>
                  </div>
                </div>
                <div>
                  <div>
                  <h3 className='font-semibold'>{book.bookTitle}</h3>
                  <p>{book.autherName}</p>
                  </div>
                  <div>
                    <p>$10.00</p>
                  </div>
                </div>

            </Link>
          </SwiperSlide>)
        }
        
      </Swiper>
      </div>

    </div>
  )
}

export default BookCards