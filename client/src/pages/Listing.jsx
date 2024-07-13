import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {FaBath,FaBed,FaChair,FaMapMarkedAlt,FaMapMarkerAlt,FaParking,FaShare,FaBuilding} from 'react-icons/fa';


export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

console.log(loading);



return (
  <main className="bg-blue-100 min-h-screen">
    {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
    {error && (
      <p className='text-center my-7 text-2xl'>Something went wrong!</p>
    )}
    {listing && !loading && !error && (
      <div>
        <Swiper navigation>
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className='h-[450px] w-full'
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='fixed top-[13%] bottom-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white shadow-lg cursor-pointer'>
          <FaShare
            className='text-slate-500'
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          />
        </div>
        {copied && (
          <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-white shadow-lg p-2'>
            Link copied!
          </p>
        )}
        <div className='max-w-4xl mx-auto p-6 my-7 bg-white shadow-2xl rounded-lg'>
          <p className='text-4xl font-semibold mb-6 text-indigo-600'>
            {listing.name} - LKR{' '}
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <p className='flex items-center mb-6 gap-2 text-slate-600 text-lg'>
            <FaMapMarkerAlt className='text-blue-700' />
            {listing.address}
          </p>
          <div className='flex gap-4 mb-6'>
  <p className='bg-blue-600 text-white text-center py-2 px-4 rounded-full shadow-md'>
    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
  </p>
  {listing.offer && (
    <p className='bg-blue-600 text-white text-center py-2 px-4 rounded-full shadow-md'>
      ${+listing.regularPrice - +listing.discountPrice} OFF
    </p>
  )}
</div>

          <p className='text-slate-800 mb-6'>
            <span className='font-semibold text-black'>Description: </span>
            {listing.description}
          </p>

          <p className='text-slate-800 mb-6 flex items-center'>
            <span className='font-semibold text-black text-xl mr-2'>Property Type:</span>
            <span className='bg-indigo-100 text-indigo-600 py-1 px-3 rounded-full shadow-sm text-lg'>
              {listing.propertyType}
            </span>
          </p>

          <ul className='text-blue-600 font-semibold text-lg flex flex-wrap items-center gap-8 sm:gap-11 mb-6'>
            <li className='flex items-center gap-2 whitespace-nowrap'>
            <FaBuilding className='text-2xl' />
            {listing.floors === 1
              ? `${listing.floors} floor`
              : `${listing.floors} floors`}
            </li>

            {listing.floors > 1 && (listing.propertyType === 'Flat' || listing.propertyType === 'Apartment') && (
            <li className='flex items-center gap-2 whitespace-nowrap'>
            <FaBuilding className='text-2xl' />
              <span>Floor Number: {listing.floorNumber}</span>
            </li>
            )}
          </ul>


          <ul className='text-blue-600 font-semibold text-lg flex flex-wrap items-center gap-4 sm:gap-6 mb-6'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBed className='text-2xl' />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : `${listing.bedrooms} Bedroom`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBath className='text-2xl' />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : `${listing.bathrooms} Bathroom`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaParking className='text-2xl' />
              {listing.parking ? 'Parking spot' : 'No Parking'}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaChair className='text-2xl' />
              {listing.furnished ? 'Furnished' : 'Unfurnished'}
            </li>
          </ul>

        </div>
      </div>
    )}
  </main>
);


}
