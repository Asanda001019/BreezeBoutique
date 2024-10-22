function CheckoutForm({ clientSecret, navigate }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error(error);
        alert(error.message); // Display the error to the user
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment successful!', paymentIntent);
        alert('Payment successful!');

        // Redirect to booking history or confirmation page
        navigate('/booking-confirmation');
      }
    } catch (error) {
      console.error('Payment error:', error);
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
