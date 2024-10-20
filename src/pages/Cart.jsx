import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Cart() {
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return <p>No booking details available.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Booking Summary</h1>
      <div className="mt-4">
        <p><strong>Accommodation:</strong> {bookingDetails.accommodationId}</p>
        <p><strong>Check-In:</strong> {bookingDetails.checkIn}</p>
        <p><strong>Check-Out:</strong> {bookingDetails.checkOut}</p>
        <p><strong>Number of Guests:</strong> {bookingDetails.guests}</p>
        <p><strong>Total Price:</strong> R{bookingDetails.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
