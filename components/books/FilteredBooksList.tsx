import AllBooksList from "@/components/books/AllBooksList";
import BookFilterPanel from "@/components/books/BookFilterPanel";
import { Book } from "@/types/type";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const pageNumber = Number((await searchParams).page);

  return (
    <main className="container">
      <div className="text-center my-12">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Discover Your Next <span className="text-blue-500">Great Read!</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Dive into our curated collection of books across all genres and
          styles.
        </p>
      </div>

      <div className="grid grid-cols-4 mt-8 gap-6">
        <BookFilterPanel />

        {Object.keys(params).length > 1 ? (
          <div>Hello world</div>
        ) : (
          <AllBooksList pageNumber={pageNumber} />
        )}
      </div>
    </main>
  );
}
