import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Cart() {
  const { state } = useLocation();
  const bookingDetails = state?.bookingDetails;

  if (!bookingDetails) {
    return <p>No booking details found.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Booking Confirmation</h1>
      <h2 className="mt-6 text-xl font-semibold">Accommodation Details:</h2>
      <p>Name: {bookingDetails.accommodationId}</p>
      <p>Check-In: {bookingDetails.checkIn}</p>
      <p>Check-Out: {bookingDetails.checkOut}</p>
      <p>Number of Guests: {bookingDetails.guests}</p>
      {/* Add payment method selection here */}
    </div>
  );
}
