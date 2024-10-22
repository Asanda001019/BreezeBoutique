import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './Firebase'; // Firebase configuration file
import { doc, getDoc, addDoc, collection } from 'firebase/firestore'; // Firestore methods
import { useAuth } from '../pages/UseAuth'; // Assuming you have useAuth for current user

export default function AccommodationDetails() {
  const { id } = useParams(); // Get the accommodation ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { currentUser } = useAuth(); // Get current logged-in user

  // State for accommodation data and loading status
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking form states
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // New state to hold total price

  // Fetch accommodation details from Firestore by ID
  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const accommodationRef = doc(db, 'accommodations', id); // Fetch document by ID
        const accommodationSnap = await getDoc(accommodationRef);

        if (accommodationSnap.exists()) {
          setAccommodation({ id: accommodationSnap.id, ...accommodationSnap.data() });
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching accommodation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodation();
  }, [id]);

  // Helper function to calculate the number of nights
  const calculateNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate - checkInDate;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days;
  };

  // Update total price whenever dates or number of guests change
  useEffect(() => {
    if (checkInDate && checkOutDate && accommodation) {
      const nights = calculateNights(checkInDate, checkOutDate);
      if (nights > 0) {
        const pricePerNight = accommodation.price; // Assuming accommodation has a price field
        const calculatedTotal = pricePerNight * nights * numberOfGuests;
        setTotalPrice(calculatedTotal);
      }
    }
  }, [checkInDate, checkOutDate, numberOfGuests, accommodation]);

  if (loading) {
    return <p>Loading accommodation details...</p>;
  }

  if (!accommodation) {
    return <p>Accommodation not found.</p>;
  }

  // Handle form submission for booking
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You need to be logged in to book.");
      return;
    }

    const bookingDetails = {
      userId: currentUser.uid, // Store the current user ID
      accommodationId: accommodation.id,
      accommodationName: accommodation.name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: numberOfGuests,
      adults,
      children,
      totalPrice, // Use totalPrice here
      bookedAt: new Date(), // Timestamp of the booking
    };

    try {
      // Save booking details to Firestore in "bookings" collection
      await addDoc(collection(db, 'bookings'), bookingDetails);

      alert('Booking successful!');

      // Navigate to Cart and pass booking details as state
      navigate('/cart', { state: { bookingDetails } }); // Pass bookingDetails in state
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to book. Please try again later.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{accommodation.name}</h1>
      <img src={accommodation.imageUrl} alt={accommodation.name} className="w-full h-64 object-cover mt-4" />
      <p className="mt-4">{accommodation.description}</p>

      {/* Display price per night */}
      <h2 className="mt-4 text-lg font-semibold">Price: R{accommodation.price} per night</h2>

      <h2 className="mt-6 text-xl font-semibold">Amenities:</h2>
      <ul className="mt-2">
        {accommodation.amenities && accommodation.amenities.length > 0 ? (
          accommodation.amenities.map((amenity, index) => (
            <li key={index} className="text-gray-600">{amenity}</li>
          ))
        ) : (
          <p>No amenities available</p>
        )}
      </ul>

      {/* Booking Form */}
      <h2 className="mt-6 text-xl font-semibold">Book Your Stay</h2>
      <form onSubmit={handleBooking} className="mt-4">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium">Check-In Date:</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Check-Out Date:</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Number of Guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(Math.max(1, parseInt(e.target.value)))}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Adults:</label>
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value)))}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Children:</label>
            <input
              type="number"
              value={children}
              onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value)))}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              min="0"
            />
          </div>

          {/* Display total price */}
          <h3 className="text-lg font-semibold">Total Price: R{totalPrice.toFixed(2)}</h3>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}
