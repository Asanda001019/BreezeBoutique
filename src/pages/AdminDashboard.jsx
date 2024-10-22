import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="px-4 py-5 text-center font-bold text-2xl border-b border-blue-500">
          Admin Dashboard
        </div>
        <nav className="flex flex-col mt-5">
          <Link
            to="/admin-dashboard"
            className="px-4 py-2 hover:bg-blue-600 focus:bg-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/admin-dashboard/add-accommodation"
            className="px-4 py-2 hover:bg-blue-600 focus:bg-blue-600 transition"
          >
            Add Accommodation
          </Link>
          <Link
            to="/view-manage-accommodations"
            className="px-4 py-2 hover:bg-blue-600 focus:bg-blue-600 transition"
          >
            View & Manage Accommodations
          </Link>
          <Link
            to="/admin-bookingd"
            className="px-4 py-2 hover:bg-blue-600 focus:bg-blue-600 transition"
          >
            Bookings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">Welcome to the Admin Dashboard</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-gray-600">Select an option from the sidebar to manage accommodations.</p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
