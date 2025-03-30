import { getCartSummary } from "@/actions/cart-actions";
import PaymentElements from "@/components/payment/PaymentElements";
import { auth } from "@/lib/auth";

export default async function PaymentPage() {
  const session = await auth();
  const userId = session?.user.id;
  const { totalPrice } = { ...(await getCartSummary(userId)) };
  if (!totalPrice) return;
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto p-10 text-gray-900 text-center border border-blue-300 rounded-lg shadow-lg bg-gradient-to-br from-blue-100 via-blue-200 to-white">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-wide mb-3 text-blue-600">
            Complete Your Payment Securely
          </h1>
          <h2 className="text-xl font-medium text-gray-700">
            You're just one step away from receiving your books! Please review
            the payment details below and proceed with your order.
            <span className="block font-bold text-blue-500 mt-2">
              Total Amount: ${totalPrice.toFixed(2)}
            </span>
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
          <PaymentElements totalPrice={totalPrice} userId={userId} />
        </div>
      </div>
    </main>
  );
}
