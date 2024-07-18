import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import logo from '../assets/images/1.png';


export default function Header() {
    const {currentUser} = useSelector(state=>state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);

    
    return (

  <header className='bg-white'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>

      <Link to='/'>
      <img src={logo} alt="HomeHunt Logo" className="h-14 sm:h-16" />
      </Link>



      <ul className='flex gap-6 items-center'>
        <li>      
          <form onSubmit={handleSubmit} className='relative'>
            <input type="text" placeholder="Search..." className='bg-blue-50 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-20 sm:w-40 px-4 py-2 rounded-full transition duration-200' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
            <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600'>
            <FaSearch />
            </button>
          </form>
        </li>
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
