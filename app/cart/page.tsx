import CartItem from "@/components/CartItem";
import { getAllCartBooks } from "@/lib/cart";

export default function CartPage() {
  const CartBooks = getAllCartBooks();

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
      <div className=" bg-white grid grid-cols-5">
        <div className="col-span-3">
          {CartBooks
            ? CartBooks.map((book) => {
                return <CartItem {...book} key={book.id} />;
              })
            : ""}
        </div>
        <div className="bg-orange-400 col-span-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          eius inventore repellat. Amet, aliquam repudiandae culpa officia ipsa
          dignissimos cupiditate neque recusandae tempore facilis fuga ut
          perferendis dolore, nesciunt, pariatur totam cum illum. Facere
          deserunt tenetur eius omnis. Nulla quibusdam eveniet odit similique
          vel beatae earum eius excepturi ab ut?
        </div>
      </div>
    </main>
  );
}
