import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto text-center">
        {/* Navigation Links */}
        <nav className="mb-6">
          <ul className="flex justify-center space-x-8">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Press Kit
              </a>
            </li>
          </ul>
        </nav>

        {/* Social Media Icons */}
        {/* <div className="mb-6 flex justify-center space-x-6">
          <a href="#" aria-label="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current text-white hover:text-blue-400"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current text-white hover:text-red-600"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0..."></path>
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current text-white hover:text-blue-600"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4..."></path>
            </svg>
          </a>
        </div> */}

        {/* Copyright Text */}
        <p>© {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  );
}

export default Footer;
