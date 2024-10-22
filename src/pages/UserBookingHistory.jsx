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
    <div>
      <h2>Your Booking History</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              Accommodation ID: {booking.accommodationId}, Check-In: {booking.checkIn}, Check-Out: {booking.checkOut}, Total Price: R{booking.totalPrice}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}
