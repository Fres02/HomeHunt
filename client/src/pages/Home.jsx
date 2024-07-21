import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

SwiperCore.use([Navigation]);

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOfferListings();
  }, []);

  const images = [
    '/photo1.jpg',
    '/photo2.jpg',
    '/photo3.jpg',
     '/photo4.jpg'
  ];

  const texts = [
    'Discover your dream home with ease and precision.',
    'Explore a wide range of properties tailored to your needs.',
    'Find the perfect place to live with our expert guidance.',
    'Let us help you navigate the housing market with ease and confidence.'
  ];
  
  return (
    <div>
      {/* Top Section */}
      <div className='relative flex flex-col items-center justify-center gap-8 py-16 px-4 lg:py-32 lg:px-6 bg-gradient-to-r from-blue-50 to-blue-100'>
  {/* Background image */}
  <div className='absolute inset-0 z-[-1] bg-cover bg-center' style={{ backgroundImage: `url('/background1.png')` }}></div>

  <h1 className='text-center text-slate-800 font-extrabold text-4xl lg:text-7xl leading-tight'>
    Looking for <br /> Your <span className='text-blue-800'> Future Home </span> ?
  </h1>
  <p className='text-center text-gray-700 text-base lg:text-xl max-w-2xl'>
    <span className='block'>Finding a beautiful place to call home is a dream we all share.</span>
    <span className='block mt-2'>At HomeHunt, we're dedicated to turning that dream into a reality for you.</span>
  </p>
  <Link
    to={'/search'}
    className='bg-blue-700 text-white text-lg lg:text-xl font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-300'
  >
    Click Me to Explore More
  </Link>
</div>

      {/* Swiper Section */}
      <div className='relative'>
      <Swiper navigation modules={[Navigation]} className='mySwiper'>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${img}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px] lg:h-[600px] flex items-center justify-center'
            >
              <div className='bg-black bg-opacity-50 h-full w-full flex items-center justify-center'>
                <div className='text-center p-6'>
                  <p className='text-white text-xl lg:text-3xl font-semibold mb-2'>
                    {texts[index]}
                  </p>
                  <p className='text-white font-semibold text-sm lg:text-xl'>
                    Explore our diverse collection and find the best property for you.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      {/* Listing Results for Offer, Sale, and Rent */}
      <div className='max-w-6xl mx-auto p-4 lg:p-10 flex flex-col gap-12 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div>
<div className='flex flex-col my-3 space-y-2'>
  <h2 className='text-lg font-medium text-blue-600'>Don't Miss Out on Deals!</h2>
  <div className='flex justify-between items-center'>
    <h2 className='text-2xl font-bold text-blue-800'>Offers Available</h2>
    <Link
      to={'/search?offer=true'}
      className='bg-gradient-to-r from-blue-500 to-blue-700 font-semibold text-white py-2 px-4 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-colors duration-300 text-sm'
    >
      Show more offers
    </Link>
  </div>
</div>



            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>


<div className='flex flex-col my-3 space-y-2'>
  <h2 className='text-lg font-medium text-blue-600'>Find Your Next Home Today!</h2>
  <div className='flex justify-between items-center'>
    <h2 className='text-2xl font-bold text-blue-800'>Recent Places for Rent</h2>
    <Link
      to={'/search?type=rent'}
      className='bg-gradient-to-r from-blue-500 to-blue-700 font-semibold text-white py-2 px-4 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-colors duration-300 text-sm'
    >
      Show more places for rent
    </Link>
  </div>
</div>


            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>

            
<div className='flex flex-col my-3 space-y-2'>
        <h2 className='text-lg font-medium text-blue-600'>Your Dream Home is One Click Away!</h2>
          <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold text-blue-800'>Recent Places for Sale</h2>
          <Link
            to={'/search?type=sale'}
            className='bg-gradient-to-r from-blue-500 to-blue-700 font-semibold text-white py-2 px-4 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-colors duration-300 text-sm'
            >
            Show more places for sale
          </Link>
          </div>
      </div>

            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
