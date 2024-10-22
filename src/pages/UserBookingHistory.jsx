import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./Firebase"; // Firestore instance
import { useAuth } from "../pages/UseAuth"; // AuthContext to get the current user

export default function UserBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const { currentUser } = useAuth(); // Assuming you're using AuthContext for the current user

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("userId", "==", currentUser.uid)); // Query for user-specific bookings

      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
    };

    fetchBookings();
  }, [currentUser]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Booking History</h2>
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow-lg rounded-lg p-5">
              <h3 className="text-lg font-semibold">Accommodation ID: {booking.accommodationId}</h3>
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
