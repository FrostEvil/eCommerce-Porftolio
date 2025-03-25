import AddToCartButton from "@/components/AddToCartButton";
import { getSingleBook } from "@/lib/books";
import { verifySession } from "@/lib/session";
import { verifyUserData } from "@/lib/users";
import { Book } from "@/types/type";
import { checkCurrentPage } from "@/utils/checkCurrentPage";
import Image from "next/image";
import Link from "next/link";

type ParamsType = {
  params: Promise<{ slug: Book["id"] }>;
};

export default async function SingleProduct({ params }: ParamsType) {
  const slug = (await params).slug;
  const book = getSingleBook(slug);
  const {
    title,
    author,
    genre,
    price,
    language,
    yearPublished,
    rating,
    stockQuantity,
    coverImageUrl,
    description,
    id,
  } = book;

  const { verifyUser, userId, cartBook } = await verifyUserData(id);
  const cartProps = { book, userId, cartBook };
  const currentPage = checkCurrentPage(slug);
  const bookDetails = [author, genre, language, description, yearPublished];
  const bookLegend = [
    "Author",
    "Genre",
    "Language",
    "Description",
    "YearPublished",
  ];

  const showBookDetails = bookDetails.map((detail, i) => {
    return (
      <p className="text-lg" key={detail}>
        <span className="font-semibold text-gray-800">
          {bookLegend[i]}:&nbsp;
        </span>
        {detail}
      </p>
    );
  });

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Take a close look at the details about&nbsp;
        <span className="text-blue-600">{title}!</span>
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Book Image */}
        <div className="relative w-full md:w-1/3 h-[456px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={coverImageUrl}
            alt={title}
            objectFit="cover"
            layout="fill"
            className="rounded-lg"
          />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6 gap-y-2 flex flex-col">
            {showBookDetails}
            <div className="flex items-center gap-1 text-yellow-500 text-lg">
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))}
              <span className="text-gray-600 text-base ml-1">({rating})</span>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between border-t pt-6">
            <p className="text-3xl font-bold text-green-600">${price}</p>
            <div className="flex items-center gap-x-3">
              <span className="text-sm text-gray-500">
                Stock: {stockQuantity}
              </span>
              {verifyUser && <AddToCartButton cartProps={cartProps} />}
            </div>
          </div>
        </div>
      </div>
      {/* Go Back Button */}
      <div className="mt-8 flex justify-end">
        <Link
          href={`/products?page=${currentPage}`}
          className="text-blue-500 hover:text-blue-700 underline text-sm"
        >
          &larr; Go Back to Products
        </Link>
      </div>
    </main>
  );
}
