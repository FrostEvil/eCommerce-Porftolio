import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";
import selectedBooks from "@/lib/selectedBooks";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const params = await searchParams; // Await searchParams before accessing it
  const pageNumber = Number(params.page) || 1;

  const { books, metadata } = selectedBooks(pageNumber);

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
      //TODO:Add books database!
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {books.map((book) => {
          return book ? <ProductItem {...book} key={book.id} /> : "";
        })}
      </div> */}
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
