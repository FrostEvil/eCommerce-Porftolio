import { fetchSelectedBooks } from "@/actions/selected-books-actions";
import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const pageNumber = Number((await searchParams).page) || 1;
  const take: number = Number(process.env.PAGE_SIZE);
  const skip: number = (pageNumber - 1) * take;

  const { books, metadata } = await fetchSelectedBooks({ take, skip });
  return (
    <main className="container">
      <div className="text-center my-12">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Discover Your Next <span className="text-blue-500">Great Read</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Dive into our curated collection of books across all genres and
          styles.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {books.map((book) => {
          return book ? <ProductItem {...book} key={book.id} /> : "";
        })}
      </div>
      <Pagination
        {...{
          page: pageNumber,
          totalPages: metadata.totalPage,
          hasNextPage: metadata.hasNextPage,
        }}
      />
    </main>
  );
}
