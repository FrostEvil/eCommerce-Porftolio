"use server";

import convertToSubcurrency from "@/lib/convertToSubcurrency";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntents(amount: number) {
  if (!amount || isNaN(amount) || amount <= 0) {
    return { error: "Invalid amount", status: 400 };
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertToSubcurrency(amount),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return { clientPaymentIntent: paymentIntent.client_secret };
  } catch (error) {
    console.error("Internal Error:", error);

    return {
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    };
  }
}
