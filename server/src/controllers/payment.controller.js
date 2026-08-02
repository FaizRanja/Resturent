import Stripe from 'stripe';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_secret_key');

// @desc Create Stripe PaymentIntent for checkout
// @route POST /api/v1/payments/create-intent
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'usd' } = req.body;

  if (!amount || amount <= 0) {
    throw new ApiError(400, 'Invalid payment amount');
  }

  // Simulated stripe client intent fallback if secret key is mock
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('sk_test_mock')) {
    return res.status(200).json({
      success: true,
      clientSecret: 'pi_mock_3MtwBwLkdIw_secret_' + Math.random().toString(36).substring(7),
      message: 'Stripe PaymentIntent generated (Mock Mode)',
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // convert dollars to cents
    currency,
    automatic_payment_methods: { enabled: true },
  });

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});
