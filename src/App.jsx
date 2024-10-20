// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';  // Import the Navigation component
import AdminRegister from './pages/AdminRegister';
import AdminSignIn from './pages/AdminSignIn';
import UserRegister from './pages/UserRegister';
import UserSignIn from './pages/UserSignIn';
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './pages/AdminDashboard';
import AddAccommodation from './pages/AddAccommodation';
import ViewManageAccommodations from './pages/ViewManageAccommodations';
import EditAccommodation from './pages/EditAccommodations';
import AccommodationsList from './pages/AccommodationList';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import AccommodationDetails from './pages/AccommodationDetails';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import NoPage from './pages/NoPage';
import Footer from './components/Footer';
import Favourites from './pages/Favourites';
import RateUs from './pages/RateUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/add-accommodation" element={<AddAccommodation />} />
          <Route path="/view-manage-accommodations" element={<ViewManageAccommodations />} />
          <Route path="/edit-accommodation/:id" element={<EditAccommodation />} />
          <Route path="/accommodation-details" element={<AccommodationDetails />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
          <Route path="/accommodations" element={<AccommodationsList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/signin" element={<UserSignIn />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path='/rate-us' element={<RateUs/>}/>
          
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
