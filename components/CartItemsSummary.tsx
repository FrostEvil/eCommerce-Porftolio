import { CartSummary } from "@/types/type";
import Link from "next/link";

export default function CartItemsSummary({
  totalPrice,
  totalQuantity,
}: CartSummary) {
  return (
    <div className="flex flex-col  py-8 px-4">
      <div className="flex items-center mb-4">
        <p className="flex-grow font-semibold text-xl text-gray-800">
          Total value:
        </p>
        <p
          className="font-bold text-2xl text-orange-500"
          aria-label="Total value"
        >
          {totalPrice ? `${totalPrice.toFixed(2)}$` : "  ---$"}
        </p>
      </div>
      <div className="flex items-center mb-6">
        <p className="flex-grow text-lg text-gray-700">Total books:</p>
        <p className="text-lg text-gray-700">
          {totalQuantity ? totalQuantity : "0"}
        </p>
      </div>

      {totalPrice === 0 ? (
        ""
      ) : (
        <Link
          href="/cart/payment"
          className=" mt-auto bg-orange-400 py-2 rounded-xl font-semibold uppercase text-xl text-center text-gray-900 transition dration-300 hover:bg-orange-500 hover:shadow-lg active:scale-95"
        >
          Order & Pay
        </Link>
      )}
    </div>
  );
}
