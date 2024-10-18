// AdminRegister.js
import React, { useState } from 'react';
import { FaUser, FaBuilding, FaEnvelope, FaLock } from 'react-icons/fa';
import { auth, db } from './Firebase'; // Adjust the path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc,doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function AdminRegister() {
  // State variables for each input field and error handling
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error messages

    try {
      // Firebase function to create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser
      console.log(user)

if(user){
  await setDoc (doc(db, "Admin", user.uid),{
    email: user.email,
    firstname:firstName,
    surname:surname,
    companyname:companyName,

  });
}

      console.log("User registered successfully:", userCredential.user);
      alert("Registration successful!");
      
      // Reset form fields after successful registration
      setFirstName('');
      setSurname('');
      setCompanyName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Error registering user:", error);
      toast.success("admin registered succesfully", {
        position:"top-center",
      })
      setError(error.message); // Display error message if registration fails
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">Admin Register</h2>
        
        {/* Error message display */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Surname Input */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Company Name Input */}
          <div className="relative">
            <FaBuilding className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
