// UserSignIn.js
import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { auth } from './Firebase'; // Adjust import paths to your Firebase configuration
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function UserSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Sign in with Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);

      // Show success alert
      alert('You have successfully logged in!');

      // Navigate to the home page or another route after successful login
      navigate('/accommodations'); // Update to your desired route
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">User Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSignIn;
