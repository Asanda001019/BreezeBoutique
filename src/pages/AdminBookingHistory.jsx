import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase"; // Firestore instance

export default function AdminBookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsRef = collection(db, "bookings"); // Reference to the bookings collection
      const querySnapshot = await getDocs(bookingsRef); // Fetch all bookings
      const bookingsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Booking History</h2>
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow-lg rounded-lg p-5">
              <h3 className="text-lg font-semibold">Accommodation ID: {booking.accommodationId}</h3>
              <p className="text-gray-700"><strong>User ID:</strong> {booking.userId}</p>
              <p className="text-gray-700"><strong>Check-In:</strong> {booking.checkIn}</p>
              <p className="text-gray-700"><strong>Check-Out:</strong> {booking.checkOut}</p>
              <p className="text-gray-700"><strong>Total Price:</strong> R{booking.totalPrice}</p>
              {/* You can add more details as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No bookings found</p>
      )}
    </div>
  );
}
