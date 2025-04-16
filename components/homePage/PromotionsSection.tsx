import { getDiscountedBooks } from "@/actions/book-actions";
import PromotionsBookItem from "./PromotionsBookItem";

const TAKE: number = 4;

export default async function Promotions() {
  const discountedBooks = await getDiscountedBooks(TAKE);
  if (!discountedBooks) return;

  const displayDiscountedBooks = discountedBooks.map((book) => {
    return <PromotionsBookItem book={book} key={book.id} />;
  });
  return (
    <section className="bg-white shadow-sm">
      <h2 className="pl-6 py-4 text-3xl text-bold text-gray-900 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400">
        Limited-Time Offer on Must-Reads
      </h2>
      <div className="py-8 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {displayDiscountedBooks}
      </div>
    </section>
  );
}
