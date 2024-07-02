'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ENDPOINTS } from '../api/endpoint';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        ENDPOINTS.LOGIN,
        { email, password },
        { withCredentials: true }
      );
      // Store access and refresh tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      // Navigate to home page
      router.push('/');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.non_field_errors) {
            setError(error.response.data.non_field_errors[0]);
          } else {
            setError('Invalid email or password. Please check your credentials.');
          }
        } else if (error.response.status === 401) {
          setError('Unauthorized. Please check your credentials.');
        } else if (error.response.status === 404) {
          setError('User does not exist. Please check your email.');
        } else if (error.response.status === 500) {
          setError('Internal server error. Please try again later.');
        } else {
          setError(`Unexpected error: ${error.response.status}. Please try again later.`);
        }
      } else if (error.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <Link href="/register" className="text-sm text-indigo-600 hover:underline">
            Register
          </Link>
          <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
