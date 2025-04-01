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
    <section className=" py-12 px-6 container">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Limited-Time Offer on Must-Reads
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {displayDiscountedBooks}
      </div>
    </section>
  );
}
