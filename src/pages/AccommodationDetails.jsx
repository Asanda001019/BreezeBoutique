import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './Firebase'; // Firebase configuration file
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods

export default function AccommodationDetails() {
  const { id } = useParams(); // Get the accommodation ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically

  // State for accommodation data and loading status
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking form states
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);

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

  if (loading) {
    return <p>Loading accommodation details...</p>;
  }

  if (!accommodation) {
    return <p>Accommodation not found.</p>;
  }

  // Handle form submission for booking
  const handleBooking = (e) => {
    e.preventDefault();

    const bookingDetails = {
      accommodationId: accommodation.id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: numberOfGuests,
    };

    console.log(bookingDetails); // You can replace this with logic to save booking details in the database
    navigate('/cart', { state: { bookingDetails } }); // Navigate to the cart page with booking details
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{accommodation.name}</h1>
      <img src={accommodation.imageUrl} alt={accommodation.name} className="w-full h-64 object-cover mt-4" />
      <p className="mt-4">{accommodation.description}</p>

      <h2 className="mt-6 text-xl font-semibold">Amenities:</h2>
      <ul className="mt-2">
        {/* Ensure that amenities is defined before mapping */}
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
