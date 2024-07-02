'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ENDPOINTS } from '../api/endpoint';
import Link from 'next/link';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({});
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess('');
    try {
      const response = await axios.post(
        ENDPOINTS.REGISTER,
        { email, password, name }
      );
      setSuccess('Registration successful. You can now log in.');
      router.push('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else if (error.request) {
        setError({ general: 'No response from server. Please check your connection.' });
      } else {
        setError({ general: 'An unexpected error occurred. Please try again later.' });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      {error.general && <div className="mb-4 text-red-500 text-center">{error.general}</div>}
      {success && <div className="mb-4 text-green-500 text-center">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!error.name}
            aria-describedby={error.name ? 'name-error' : undefined}
          />
          {error.name && <p id="name-error" className="mt-2 text-sm text-red-600">{error.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error.email}
            aria-describedby={error.email ? 'email-error' : undefined}
          />
          {error.email && <p id="email-error" className="mt-2 text-sm text-red-600">{error.email[0]}</p>}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!error.password}
            aria-describedby={error.password ? 'password-error' : undefined}
          />
          {error.password && <p id="password-error" className="mt-2 text-sm text-red-600">{error.password[0]}</p>}
        </div>
        {error.non_field_errors && <div className="mt-4 text-sm text-red-600">{error.non_field_errors[0]}</div>}
        <div>
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Register
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <Link href="/login" className="text-sm text-indigo-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
