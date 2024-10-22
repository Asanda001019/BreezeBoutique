import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./Firebase"; // Firestore instance
import { useAuth } from "../pages/UseAuth"; // AuthContext to get the current user

export default function UserBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [accommodations, setAccommodations] = useState({}); // State to store accommodation details
  const { currentUser } = useAuth(); // Assuming you're using AuthContext for the current user

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("userId", "==", currentUser.uid)); // Query for user-specific bookings

      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsData);

      // Fetch accommodation names based on accommodationIds
      const accommodationIds = bookingsData.map((booking) => booking.accommodationId);
      const accommodationRef = collection(db, "accommodations"); // Assuming you have an 'accommodations' collection
      const accommodationQuery = query(accommodationRef, where("id", "in", accommodationIds)); // Change this line as needed based on your data structure

      const accommodationSnapshot = await getDocs(accommodationQuery);
      const accommodationsData = accommodationSnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data().name; // Assuming 'name' is the field containing accommodation name
        return acc;
      }, {});

      setAccommodations(accommodationsData);
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
              Accommodation Name: {accommodations[booking.accommodationId] || "Loading..."},
              Check-In: {booking.checkIn},
              Check-Out: {booking.checkOut},
              Total Price: R{booking.totalPrice}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}
