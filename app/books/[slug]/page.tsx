import RatingValue from "@/components/RatingValue";
import AddBookToCart from "@/components/books/AddBookToCart";
import GoBackButton from "@/components/books/GoBackButton";
import { getBookById } from "@/drizzle/bookQueries";
import { auth } from "@/lib/auth";
import { Book } from "@/types/type";
import Image from "next/image";

type ParamsType = {
  params: Promise<{ slug: Book["id"] }>;
};

export default async function BookPage({ params }: ParamsType) {
  const session = await auth();
  const slug = (await params).slug;
  const slugBook = (await getBookById(slug)) as Book;
  if (!slugBook) {
    return (
      <section className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Book not found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the book you're looking for. It may have been
            removed or the link is incorrect.
          </p>
          <GoBackButton />
        </div>
      </section>
    );
  }
  const {
    title,
    author,
    genre,
    language,
    description,
    yearPublished,
    coverImageUrl,
    rating,
    price,
    discount,
  } = {
    ...slugBook,
  };
  const bookDetails = [author, genre, language, description, yearPublished];
  const bookLegend = [
    "Author",
    "Genre",
    "Language",
    "Description",
    "YearPublished",
  ];

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Take a close look at the details about&nbsp;
        <span className="text-blue-600">{title}!</span>
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-full md:w-1/3 h-[456px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={coverImageUrl}
            alt={title}
            objectFit="cover"
            layout="fill"
            className="rounded-lg"
          />
        </div>

        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6 gap-y-2 flex flex-col">
            {bookDetails.map((detail, i) => {
              return (
                <p className="text-lg" key={detail}>
                  <span className="font-semibold text-gray-800">
                    {bookLegend[i]}:&nbsp;
                  </span>
                  {detail}
                </p>
              );
            })}
            <div className="flex items-center gap-1 text-yellow-500 text-lg">
              <RatingValue value={rating} />
              <span className="text-gray-600 text-base ml-1">({rating})</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            {discount === 0 ? (
              <p className="text-3xl font-bold text-green-600">${price}</p>
            ) : (
              <div className="flex items-center gap-x-2">
                <p className=" text-3xl  text-red-600 font-bold">
                  ${(price * (1 - discount / 100)).toFixed(2)}
                </p>
                <p className="line-through text-gray-500 text-base">
                  {price.toFixed(2)}$
                </p>
              </div>
            )}
            <div className="flex items-center gap-x-3">
              {session && (
                <AddBookToCart bookId={slug} userId={session.user.id} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <GoBackButton />
      </div>
    </main>
  );
}
