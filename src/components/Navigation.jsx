import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hotelAppLogo.svg'; // Import your logo

function Navigation() {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center h-10">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Breeze Boutique Logo"
            className="h-20 w-20 rounded-full object-cover p-2" // Circle shape
          />
          <h1 className="text-xl font-bold">Breeze_Boutique</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/admin/register" className="hover:text-gray-200">Admin Register</Link>
          </li>
          <li>
            <Link to="/admin/signin" className="hover:text-gray-200">Admin Sign In</Link>
          </li>
          <li>
            <Link to="/user/register" className="hover:text-gray-200">User Register</Link>
          </li>
          <li>
            <Link to="/user/signin" className="hover:text-gray-200">User Sign In</Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-gray-200">About</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-200">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
