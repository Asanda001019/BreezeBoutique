import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ totalCost, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Booking Customer', // You can replace this with a name input if needed
        },
      },
    });

    if (error) {
      setError(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentSucceeded(true);
      setError(null);
      // Here you can also handle post-payment logic, like redirecting or showing a confirmation message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <CardElement className="p-2 border border-gray-300 rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Pay R{totalCost}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {paymentSucceeded && <p className="text-green-600 mt-4">Payment succeeded!</p>}
    </form>
  );
};

export default CheckoutForm;
