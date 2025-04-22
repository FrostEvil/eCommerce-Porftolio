import { getCartSummary } from "@/actions/cart-actions";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { CreditCard } from "lucide-react";

export default async function CartItemsSummary() {
  const session = await auth();
  if (!session) return null;

  const cartSummary = await getCartSummary(session.user.id);
  const { totalAmount, totalPrice } = { ...cartSummary };

  return (
    <div className="h-fit bg-white p-6  shadow-md border border-gray-200 flex flex-col">
      <div className="flex items-center mb-4">
        <p className="flex-grow font-semibold text-base md:text-lg lg:text-xl text-gray-800">
          Total value:
        </p>
        <p
          className="font-bold text-base md:text-lg lg:text-xl  text-orange-500"
          aria-label="Total value"
        >
          {totalPrice ? `${totalPrice.toFixed(2)}$` : "---$"}
        </p>
      </div>

      <div className="flex items-center mb-6">
        <p className="flex-grow text-sm md:text-base lg:text-lg text-gray-700">
          Total books:
        </p>
        <p className="text-sm md:text-base lg:text-lg text-gray-700">
          {totalAmount ? totalAmount : "0"}
        </p>
      </div>

      <Link
        href="/cart/payment"
        className="mt-auto bg-orange-500 py-3 px-6 rounded-2xl font-bold uppercase text-sm md:text-base lg:text-lg text-white transition duration-300 hover:bg-orange-600 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
      >
        <CreditCard size={20} />
        Order & Pay
      </Link>

      <span className="text-xs text-gray-600 mt-2 text-center">
        Secure checkout • No hidden fees
      </span>
    </div>
  );
}
