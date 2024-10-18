// AdminLogin.js
import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { auth, db } from './Firebase'; // Adjust the path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFail } from '../features/adminSlice'; // Import actions
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

function AdminSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the admin's specific data from Firestore
      const docRef = doc(db, "Admin", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const adminData = docSnap.data();
        
        dispatch(loginSuccess({ email: adminData.email, ...adminData }));

        toast.success("Logged in successfully!", {
          position: "top-center",
        });

        // Redirect to admin dashboard or another page
        navigate('/admin-dashboard'); // Update to your desired route
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed: " + error.message, {
        position: "top-center",
      });
      dispatch(loginFail(error.message)); // Dispatch error action
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignIn;
