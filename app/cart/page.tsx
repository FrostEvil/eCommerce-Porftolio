import CartBookItem from "@/components/CartBookItem";
import CartItemsSummary from "@/components/CartItemsSummary";
import { getCartBooks } from "@/drizzle/cartQueries";
import { auth } from "@/lib/auth";
import { CartBook } from "@/types/type";

export default async function CartPage() {
  const session = await auth();
  const userCartBooks: CartBook[] | undefined = await getCartBooks(
    session?.user.id
  );
  if (!userCartBooks) return;
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
          {userCartBooks.length === 0 ? (
            <p className="px-6 py-4 text-lg text-gray-700">
              Your cart is empty! 📚 Browse our collection and add your favorite
              books to start your reading journey. Head back to the product page
              and find your next great read! 🚀
            </p>
          ) : (
            userCartBooks.map((cartBook) => {
              return <CartBookItem cartBook={cartBook} key={cartBook.id} />;
            })
          )}
        </div>

        <div className="bg-white col-span-2">
          <CartItemsSummary />
        </div>
      </div>
    </main>
  );
}
