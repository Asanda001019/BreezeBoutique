import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51QC9RyERBDcUQIctEqk7zuyc0aKjQUHgoANvLztisBX1TGtmHWKg3axMSmGjpSXl5HQ9cbtKoqabKQLc8vGgUmdx00ivID1458');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Get the amount to charge from the request

  try {
    // Create a payment intent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe works with smallest currency unit, hence multiplying by 100 for USD
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

app.listen(4242, () => console.log('Server is running on port 4242'));
