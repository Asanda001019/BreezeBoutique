import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase"; // Firestore instance

export default function AdminBookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      const bookingsRef = collection(db, "bookings");
      const querySnapshot = await getDocs(bookingsRef);
      const bookingsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
    };

    fetchAllBookings();
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              User ID: {booking.userId}, Accommodation ID: {booking.accommodationId}, Check-In: {booking.checkIn}, Check-Out: {booking.checkOut}, Total Price: R{booking.totalPrice}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  );
}
