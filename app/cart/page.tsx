import CartItem from "@/components/CartItem";
import CartItemsSummary from "@/components/CartItemsSummary";
import { getAllCartBooks } from "@/lib/cart";
import { CartBook } from "@/types/type";
import calculateCartSummary from "@/utils/calculateCartSummary";
import userSessionId from "@/utils/userSessionId";

export default async function CartPage() {
  const userId = await userSessionId();
  console.log("userId", userId);
  const CartBooks = getAllCartBooks(userId);

  const CartSummaryValues = await calculateCartSummary();
  return (
    <main className="container mx-auto px-6 py-12">
      <div>
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          LitStore Cart Summary – Let’s Complete Your Library!
        </h1>
        <p className="text-2xl text-center text-gray-700 mb-6">
          Review your selected books, adjust quantities, and finalize your
          purchase to complete your library. Your next favorite read is just a
          step away!
        </p>
      </div>
      <div className=" grid grid-cols-5 gap-x-8">
        <div className="col-span-3 bg-white">
          {CartBooks
            ? CartBooks.map((cartBook: CartBook) => {
                return <CartItem {...cartBook} key={cartBook.id} />;
              })
            : ""}
        </div>
        <div className="bg-white col-span-2">
          <CartItemsSummary {...CartSummaryValues} />
        </div>
      </div>
    </main>
  );
}
