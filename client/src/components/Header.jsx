import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';



export default function Header() {
    const {currentUser} = useSelector(state=>state.user)
    
    return (

  <header className='bg-gray shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>

      <Link to='/'>
        <h1 className='font-bold text-lg sm:text-2xl flex items-center'>
          <span className='text-indigo-500'>Home</span>
          <span className='text-indigo-700'>Hunt</span>
        </h1>
      </Link>

      <form className='relative'>
        <input
          type="text"
          placeholder="Search..."
          className='bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-32 sm:w-64 px-4 py-2 rounded-full transition duration-200'
        />
        <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600'>
          <FaSearch />
        </button>
      </form>

      <ul className='flex gap-6 items-center'>
        <Link to='/'><li className='hidden sm:inline text-indigo-700 hover:text-indigo-900 transition duration-200'>Home</li></Link>
        <Link to='/about'><li className='hidden sm:inline text-indigo-700 hover:text-indigo-900 transition duration-200'>About</li></Link>
        <Link to='/profile'>
          {currentUser ? (
            <img className='rounded-full h-8 w-8 object-cover border-2 border-indigo-500' src={currentUser.avatar} alt='profile'/>
          ) : (
            <li className='text-indigo-700 hover:text-indigo-900 transition duration-200'>Sign in</li>
          )}
        </Link>
      </ul>

    </div>
  </header>
);
}
