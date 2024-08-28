import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError('Password and Confirm Password does not match');
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:3000/user/sign-up', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 201) {
        throw new Error('Network response was not ok');
      }

      if (response.user_id) {
        toast.success('Registration successful!');
        console.log('Success:', response.data);
        // Redirect to /login page
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      } else {
        console.log('sign up failed')
        // console.log(response.user_id)
      }

    }
    catch (error) {
      // if (error.response) {
      //   // The request was made and the server responded with a status code
        alert(error.response.data);
      //   // navigate('/login');
      //   setFormData({ email: '', password: '', confirmPassword: '' })
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   toast.error('An unexpected error occurred. Please try again later.');
      // }
      // console.error('Error:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-w-[350px] border p-5 shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Name:
            </label>
            <input
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
            />
          </div>
          {
            error && <div className='text-red-600 text-sm'>{error}</div>
          }
          <button
            type="submit"
            className="bg-[#8910F1] mt-3  text-white font-bold py-2 px-4 rounded active:scale-95 duration-150 hover:shadow-md"
          >
            Sign up
          </button>
        </form>
        <div className='flex items-center gap-x-2 mt-3'>
          <p>Already have account?: </p>

          <Link to={'/login'} className='text-[#8910F1] font-medium hover:underline'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;