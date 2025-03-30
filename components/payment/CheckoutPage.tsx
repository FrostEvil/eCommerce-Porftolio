"use client";

import { createPaymentIntents } from "@/actions/payment-intent-actions";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { removeUserCartBook } from "@/actions/cart-actions";

export default function CheckoutPage({
  totalPrice,
  userId,
}: {
  totalPrice: number;
  userId: User["id"];
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleCloseModal = () => {
    setSuccessModal(false);
    router.push("/");
  };

  const handleRemoveUserCartBook = async () => {
    await removeUserCartBook(userId);
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      const { clientPaymentIntent, error } = await createPaymentIntents(
        totalPrice
      );
      if (clientPaymentIntent) {
        setClientSecret(clientPaymentIntent);
      } else if (error) {
        setErrorMessage(error);
      }
    };
    fetchClientSecret();
  }, [totalPrice]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/cart/payment/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      //add some actions like: clear up a cart items, totalPrice, totalQuantity, update stock in book db
      handleRemoveUserCartBook();
      setSuccessModal(true);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (successModal) {
    return (
      <Modal
        show={successModal}
        onClose={handleCloseModal}
        metadata={{
          title: "Payment Successful! 🎉",
          submit: "OK",
          redirectTo: "/",
        }}
      >
        <p className="text-lg text-gray-800">
          Congratulations, your payment has been successfully processed! Your
          order is on its way, and we'll notify you once it's shipped.
        </p>
        <p className="text-gray-600 mt-4">
          A confirmation email has been sent to you at &nbsp;
          <strong>email@email.com</strong>. Please check your inbox (and spam
          folder) for further details.
        </p>
        <p className="mt-6 text-sm text-gray-500">
          If you have any questions, feel free to contact our support team.
        </p>
      </Modal>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
      </button>
    </form>
  );
}
