import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load Stripe with your public key
const stripePromise = loadStripe('pk_test_51QC9RyERBDcUQIctabXh1R89U8A6NWsNAiHDCiivEGWqcE6Ys84iOLkKQMZAkUAjLjKHJqVmdLTnlzhENjInvxyV001aG4mo2D');

// CheckoutForm Component
function CheckoutForm({ clientSecret, navigate }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setLoading(false);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment succeeded! Your booking is confirmed.');
        setLoading(false);
        // Navigate to a confirmation page or another flow as needed
        navigate('/rate-us'); 
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={loading || !stripe || !elements}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

// Cart Component
export default function Cart() {
  const { state } = useLocation();
  const bookingDetails = state?.bookingDetails;
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Log booking details to verify data
    console.log('Booking Details:', bookingDetails);

    if (bookingDetails?.totalPrice) {
      // Create PaymentIntent if totalPrice is available
      axios.post('http://localhost:4242/create-payment-intent', {
        amount: Math.round(bookingDetails.totalPrice * 100), // Convert to smallest currency unit (cents)
      })
      .then((res) => {
        console.log('Payment Intent created:', res.data);
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
          <p className="mb-2"><strong>Name:</strong> {bookingDetails.accommodationId}</p>
          <p className="mb-2"><strong>Check-In:</strong> {bookingDetails.checkIn}</p>
          <p className="mb-2"><strong>Check-Out:</strong> {bookingDetails.checkOut}</p>
          <p className="mb-2"><strong>Guests:</strong> {bookingDetails.guests}</p>
          <h3 className="mt-4 text-lg font-semibold">Total Price: R{bookingDetails.totalPrice?.toFixed(2)}</h3>

          {clientSecret ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} navigate={navigate} />
            </Elements>
          ) : (
            <p>Loading payment details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
