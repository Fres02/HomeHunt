import {Link, useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
   
  return (
<div className='min-h-screen flex items-center justify-center bg-cover bg-center'style={{ backgroundImage: `url('/background11.png')` }}>
  <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
    <h1 className='text-2xl font-bold text-gray-900 text-center mb-8'>Welcome Back to HomeHunt!</h1>

    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email address</label>
        <input type="email" placeholder="Email address" className='mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' id="email" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
        <input type="password" placeholder="Password" className='mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' id="password" onChange={handleChange}/>
      </div>

      <div className='flex space-x-4'>
        <button disabled={loading} className='flex-1 bg-indigo-600 text-white py-2 rounded-full uppercase font-medium hover:bg-indigo-700 disabled:opacity-50'>
          {loading ? 'Loading...' : 'Log In'}
        </button>
        <div className='flex-1'>
          <OAuth className='w-full py-2'/>
        </div>
      </div>
    </form>

    <div className='flex justify-center items-center mt-6'>
      <p className='text-sm text-gray-600'>New User?</p>
      <Link to="/sign-up" className='text-sm text-indigo-600 hover:text-indigo-700 ml-1'>
        Sign up
      </Link>
    </div>

    {error && <p className='text-red-500 mt-4 text-center'>{error}</p>}
  </div>
</div>



  )
}
