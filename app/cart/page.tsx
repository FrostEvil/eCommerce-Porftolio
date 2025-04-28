import CartBookItem from "@/components/cart/CartBookItem";
import CartItemsSummary from "@/components/cart/CartItemsSummary";
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
    <main className="container mx-auto px-6 py-12 ">
      <div className="text-center my-12">
        <h1 className="text-2xl md:text-4xl  font-extrabold text-gray-900">
          LitStore Cart Summary – Let’s Complete Your Library!
        </h1>
        <p className="mt-4 text-base lg:text-lg text-gray-600">
          Almost there! Update your cart and get ready for your next great read.
        </p>
      </div>
      <div className=" grid md:grid-cols-5 gap-y-8 md:gap-y-0 md:gap-x-8">
        <div className="md:col-span-3  bg-white w-full">
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

        <div className="md:col-span-2 row-start-1 md:row-start-auto">
          <CartItemsSummary />
        </div>
      </div>
    </main>
  );
}
