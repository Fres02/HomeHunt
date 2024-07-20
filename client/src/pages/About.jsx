import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <div className='relative flex flex-col items-center justify-center gap-8 py-16 px-4 lg:py-32 lg:px-6 bg-gradient-to-r from-blue-50 to-blue-100'>
        {/* Background image */}
        <div className='absolute inset-0 z-[-1] bg-cover bg-center' style={{ backgroundImage: `url('path/to/your/hero-background.jpg')` }}></div>

        <h1 className='text-center text-slate-800 font-extrabold text-4xl lg:text-7xl leading-tight'>
          About <span className='text-blue-800'>HomeHunt</span>
        </h1>
        <p className='text-center text-gray-700 text-base lg:text-xl max-w-2xl'>
          <span className='block'>Welcome to HomeHunt, where we turn your dream of finding a perfect home into reality.</span>
          <span className='block mt-2'>Discover who we are and what makes us passionate about real estate.</span>
        </p>
      </div>

      {/* Company Mission Section */}
      <div className='max-w-6xl mx-auto py-16 px-4 lg:py-28 lg:px-6'>
        <div className='flex flex-col items-center text-center'>
          <h2 className='text-3xl font-bold text-slate-700 mb-4'>
            Our Mission
          </h2>
          <p className='text-gray-600 text-base lg:text-lg max-w-3xl'>
            At HomeHunt, our mission is to provide a seamless and personalized experience for finding your ideal home. We leverage innovative technology and a dedicated team to ensure that every step of the journey is smooth and enjoyable. Our commitment is to make home-buying and renting simple and satisfying.
          </p>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className='bg-gray-100 py-16 px-4 lg:py-28 lg:px-6'>
        <div className='max-w-6xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-slate-700 mb-12'>
            Meet Our Team
          </h2>
          <div className='text-center'>
  {/* Group Photo */}
  <img
    src='group_photo.jpg'
    alt='Our Team'
    className='w-full h-auto object-cover rounded-lg shadow-lg mb-6'
  />
  <div className='bg-white p-6 rounded-lg shadow-lg mx-auto max-w-lg'>
    <h3 className='text-xl font-semibold text-slate-700 mb-2'>
      The HomeHunt Team
    </h3>
    <p className='text-gray-600'>
      Our team is made up of passionate professionals dedicated to helping you find your perfect home. With years of experience in real estate, we're here to guide you every step of the way and make your home search as smooth as possible.
    </p>
  </div>
</div>

        </div>
      </div>

      {/* Call to Action Section */}
      <div className='py-16 px-4 lg:py-28 lg:px-6 bg-blue-700 text-white text-center'>
        <h2 className='text-3xl font-bold mb-4'>Ready to Find Your Dream Home?</h2>
        <p className='text-lg mb-6'>
          Our team is here to assist you every step of the way. Get in touch with us to start your home search today!
        </p>
<button className='bg-blue-800 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-900 transition-colors duration-300'>
  
Contact Us
</button>
          


      </div>
    </div>
  );
}
