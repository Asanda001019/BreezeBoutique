import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load the Stripe instance with your public key
const stripePromise = loadStripe('pk_test_51QC9RyERBDcUQIctabXh1R89U8A6NWsNAiHDCiivEGWqcE6Ys84iOLkKQMZAkUAjLjKHJqVmdLTnlzhENjInvxyV001aG4mo2D');

export default function Cart() {
  const { state } = useLocation();
  const bookingDetails = state?.bookingDetails;
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (bookingDetails?.totalPrice) {
      // Log the booking details to ensure totalPrice is valid
      console.log('Booking Details:', bookingDetails);

      // Create PaymentIntent as soon as the component mounts
      axios
        .post('http://localhost:4242/create-payment-intent', {
          amount: Math.round(bookingDetails.totalPrice * 100), // Ensure totalPrice is multiplied and rounded
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error('Error creating payment intent:', error);
        });
    }
  }, [bookingDetails]);

  if (!bookingDetails) {
    return <p>No booking details found.</p>;
  }

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Booking Confirmation</h1>

          <h2 className="text-xl font-semibold mb-4">Accommodation Details:</h2>
          <p className="mb-2">
            <strong>Name:</strong> {bookingDetails.accommodationId}
          </p>
          <p className="mb-2">
            <strong>Check-In:</strong> {bookingDetails.checkIn}
          </p>
          <p className="mb-2">
            <strong>Check-Out:</strong> {bookingDetails.checkOut}
          </p>
          <p className="mb-2">
            <strong>Guests:</strong> {bookingDetails.guests}
          </p>
          <h3 className="mt-4 text-lg font-semibold">Total Price: R{bookingDetails.totalPrice.toFixed(2)}</h3>

          <Elements stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} navigate={navigate} /> {/* Pass navigate to CheckoutForm */}
          </Elements>
        </div>
      </div>
    </div>
  );
}

function CheckoutForm({ clientSecret, navigate }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error);
      alert(error.message); // Optionally show the error to the user
    } else {
      console.log('Payment successful!', paymentIntent);
      alert('Payment successful!');
      navigate('/rate-us'); // Navigate to the cart page after payment success
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <CardElement className="border p-2 rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Pay Now
      </button>
    </form>
  );
}
