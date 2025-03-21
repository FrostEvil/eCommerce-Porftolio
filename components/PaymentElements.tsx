"use client";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { UserSession } from "@/types/type";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined!");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentElements({
  amount,
  userId,
}: {
  amount: number;
  userId: UserSession["userId"];
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(amount),
        currency: "usd",
      }}
    >
      <CheckoutPage amount={amount} userId={userId} />
    </Elements>
  );
}
