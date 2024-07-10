import {Link, useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import OAuth from '../components/OAuth';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
   
  
  console.log(formData)

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('/background1.jpg')` }}>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h1 className='text-2xl font-bold text-gray-900 text-center mb-8'>Welcome to HomeHunt!</h1>
  
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor="username" className='block text-sm font-medium text-gray-700'>Username</label>
            <input type="text" placeholder="Username" className='mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' id="username" onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email address</label>
            <input type="email" placeholder="Email address" className='mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' id="email" onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
            <input type="password" placeholder="Password" className='mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' id="password" onChange={handleChange}/>
          </div>
  
          <div className='flex space-x-4 items-center'>
            <button disabled={loading} className='flex-1 bg-indigo-600 text-white py-3 rounded-md uppercase font-medium hover:bg-indigo-700 disabled:opacity-50 focus:outline-none'>
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <div className='flex-1'>
              <OAuth className='w-full '/>
            </div>
          </div>
        </form>
  
        <div className='flex justify-center items-center mt-6'>
          <p className='text-sm text-gray-600'>Have an Account?</p>
          <Link to="/sign-in" className='text-sm text-indigo-600 hover:text-indigo-700 ml-1'>
            Sign in
          </Link>
        </div>
  
        {error && <p className='text-red-500 mt-4 text-center'>{error}</p>}
      </div>
    </div>
  );
  

}
